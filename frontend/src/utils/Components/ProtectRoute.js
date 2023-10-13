import React from "react";
import { useSelector } from "react-redux";
import { selectToken } from "../../reducers/userReducer";
import { Navigate } from "react-router-dom";
import InitLoad from "./InitLoad";

function ProtectRoute({ children }) {
  const userToken = useSelector(selectToken);
  if (!userToken) return <Navigate to="/join/login" />;
  return <InitLoad>{children}</InitLoad>;
}

export default ProtectRoute;
