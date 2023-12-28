import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRouteElement = ({ loggedIn, element }) => {
  return loggedIn ? element : <Navigate to="/sign-up" replace />;
};

export default ProtectedRouteElement;
