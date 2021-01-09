import React from "react";
import { Route, RouteProps, Redirect } from "react-router-dom";

interface Props extends RouteProps {
  token: string | null;
}

const ProtectedRoute: React.FC<Props> = ({ token, ...rest }) => {
  if (!token) {
    return <Redirect to="/login" />;
  }

  return <Route {...rest} />;
};

export default ProtectedRoute;
