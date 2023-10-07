const fetchApi = async ({ urlExt, method, formData = "", token }) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  const BASE_URL = "https://macros-counter-sugo17.onrender.com/api/user/";
  // const BASE_URL = "http://localhost:4000/api/user/";
  const options = {
    method,
    headers,
  };
  if (method === "GET") {
    headers.append("Authorization", `Bearer ${token}`);
    const data = await fetch(BASE_URL + urlExt, options);
    return data;
  } else if (method === "POST" || method === "PATCH") {
    options.body = JSON.stringify(formData);
    const data = await fetch(BASE_URL + urlExt, options);
    return data;
  }
};
export default fetchApi;
