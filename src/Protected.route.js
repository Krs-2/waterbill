import React from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import auth from "./auth";

export const ProtectedRoute = ({ Component, ...rest }) => {
  const location = useLocation();
  //console.log("=========>>" + Component && Component.name);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth.isAuthenticated()) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/profile/login",
                state: {
                  from: { hash: "", key: "uru0z9", pathname: "*", search: "" },
                  background: true,
                },
              }}
            />
          );
        }
      }}
    />
  );
};
