import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  initialData,
  selectLoading,
  selectToken,
  selectUserDetails,
  userActions,
} from "../../reducers/userReducer";
import Loader from "../../components/Loader/Loader";

function InitLoad({ children }) {
  let userToken = useSelector(selectToken);
  let userDetails = useSelector(selectUserDetails);
  const isLoading = useSelector(selectLoading);
  let dispatch = useDispatch();
  useEffect(() => {
    try {
      userToken && !userDetails && dispatch(initialData(userToken));
    } catch (error) {
      dispatch(userActions.updateToken(null));
    }
  }, [userToken, dispatch, userDetails]);
  if (userDetails) return children;
  else {
    if (isLoading) return <Loader />;
  }
}

export default InitLoad;
