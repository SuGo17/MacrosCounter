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

function InitLoad({ children, admin }) {
  let userToken = useSelector(selectToken);
  let userDetails = useSelector(selectUserDetails);
  const role = useSelector(selectUserRole);
  const isLoading = useSelector(selectLoading);
  let dispatch = useDispatch();
  try {
    userToken && !userDetails && dispatch(initialData(userToken));
    if (admin && role !== "ADMIN") {
      return <Navigate to="/" />;
    }
  } catch (error) {
    dispatch(userActions.updateToken(null));
    dispatch(userActions.updateErr(error.message));
  }
  if (userDetails) return children;
  else {
    if (isLoading) return <Loader />;
  }
}

export default InitLoad;
