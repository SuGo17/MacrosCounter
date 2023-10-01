import React from "react";
import { useSelector } from "react-redux";
import { selectToken } from "../../reducers/userReducer";
import { Navigate } from "react-router-dom";

function ProtectRoute({ children }) {
  const userToken = useSelector(selectToken);
  if (!userToken) return <Navigate to="/join/login" />;
  return children;
}

export default ProtectRoute;
