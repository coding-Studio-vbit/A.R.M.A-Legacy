import React from "react";
import { Route, Redirect } from "react-router-dom";

export function ProtectedLogin({ component: Component, ...rest }) {
  return (
    <div>
      <Route
        {...rest}
        render={(props) => {
          if (JSON.parse(localStorage.getItem("user"))) {
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
          } else {
            return <Component {...props} />;
          }
        }}
      />
    </div>
  );
}
