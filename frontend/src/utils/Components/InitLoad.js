import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  initialData,
  selectToken,
  selectUserDetails,
} from "../../reducers/userReducer";

function InitLoad({ children }) {
  let userToken = useSelector(selectToken);
  let userDetails = useSelector(selectUserDetails);
  let dispatch = useDispatch();
  useEffect(() => {
    try {
      userToken && !userDetails && dispatch(initialData(userToken));
    } catch (error) {}
  }, [userToken, dispatch, userDetails]);
  return children;
}

export default InitLoad;
