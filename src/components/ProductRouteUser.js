import Cookies from "js-cookie";
import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  var user2 = Cookies.get("uyeid");
  return <>{user2}</>;
  return (
    <Route
      {...rest}
      render={(props) => {
        if (user2) {
          return <Component {...rest} {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};

export default ProtectedRoute;
