import { useSelector, useDispatch } from "react-redux";
import {
  initialData,
  selectLoading,
  selectToken,
  selectUserDetails,
  selectUserRole,
  userActions,
} from "../../reducers/userReducer";
import Loader from "../../components/Loader/Loader";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";

function InitLoad({ children, admin }) {
  let userToken = useSelector(selectToken);
  let userDetails = useSelector(selectUserDetails);
  const role = useSelector(selectUserRole);
  const isLoading = useSelector(selectLoading);
  let dispatch = useDispatch();
  useEffect(() => {
    try {
      if (userToken && !userDetails) dispatch(initialData(userToken));
    } catch (error) {
      dispatch(userActions.updateToken(null));
      dispatch(userActions.updateErr(error.message));
    }
  }, [dispatch, userDetails, userToken]);
  if (isLoading) return <Loader />;
  if (admin && role !== "ADMIN") {
    return <Navigate to="/" />;
  }
  if (userDetails) return children;
}

export default InitLoad;
