import React from "react";
import { useSelector } from "react-redux";
import { selectToken } from "../../reducers/userReducer";
import { Navigate } from "react-router-dom";
import InitLoad from "./InitLoad";

function ProtectRoute({ children, admin }) {
  const userToken = useSelector(selectToken);
  if (!userToken) return <Navigate to="/join/login" />;
  return <InitLoad admin={admin}>{children}</InitLoad>;
}

export default ProtectRoute;
