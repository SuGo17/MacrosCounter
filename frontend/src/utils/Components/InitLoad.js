import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { initialData, selectToken } from "../../reducers/userReducer";

function InitLoad({ children }) {
  let userToken = useSelector(selectToken);
  let dispatch = useDispatch();
  useEffect(() => {
    try {
      userToken && dispatch(initialData(userToken));
    } catch (error) {}
  }, [userToken, dispatch]);
  return children;
}

export default InitLoad;
