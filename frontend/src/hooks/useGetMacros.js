import { useSelector } from "react-redux";
import { selectToken } from "../reducers/userReducer";
import fetchApi from "../utils/fetch-utils";

function useGetMacros() {
  const token = useSelector(selectToken);

  return async (searchTerm) => {
    let error, res;
    try {
      res = await fetchApi({
        urlExt: `macros/search-by-name?searchTerm=${searchTerm}`,
        method: "GET",
        token,
      });
      if (!res.ok) throw new Error(res.message);
    } catch (err) {
      error = err;
    }
    return { res, error };
  };
}

export default useGetMacros;
