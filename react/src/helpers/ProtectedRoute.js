import React from "react";
import { Route, Redirect } from "react-router-dom";

export function ProtectedRoute({ component: Component, ...rest }) {
  return (
    <div>
      <Route
        {...rest}
        render={(props) => {
          if (JSON.parse(localStorage.getItem("user"))) {
            return <Component {...props} />;
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
    </div>
  );
}
