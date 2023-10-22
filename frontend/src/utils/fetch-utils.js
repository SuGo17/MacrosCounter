import store from "../store/store";
import { refreshIdToken, logoutUser } from "../reducers/userReducer";

const fetchApi = async ({ urlExt, method, formData, token }) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  // const BASE_URL = "http://localhost:4000/api/";
  const options = {
    method,
    headers,
  };
  let data, res;
  if (formData) options.body = JSON.stringify(formData);
  token && headers.append("Authorization", `Bearer ${token}`);
  try {
    data = await fetch(BASE_URL + urlExt, options);
    res = await data.json();
    res.ok = data.ok;
    res.status = data.status;
    if (!data.ok && res.error === "jwt expired") {
      store.dispatch(refreshIdToken());
      headers.append("Authorization", `Bearer ${store.getState().user.token}`);
      data = await fetch(BASE_URL + urlExt, options);
    }
    if (!data.ok && res.error === "Invalid Request! User not logged in.")
      throw new Error(res.error);
  } catch (error) {
    store.dispatch(logoutUser());
  }
  return res;
};
export default fetchApi;
