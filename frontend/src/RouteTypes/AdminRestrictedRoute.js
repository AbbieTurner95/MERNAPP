import React from "react";
import { Route, Redirect } from "react-router-dom";

export default ({ component: Component, props: cProps, ...rest }) => {
  if (cProps.isLoggedIn) {
    if (cProps.currentUser != null && cProps.currentUser.isAdmin) {
      return (
        <Route
          {...rest}
          render={props => <Component {...props} {...cProps} />}
        />
      );
    } else {
      return (
        <Route
          {...rest}
          render={props => (
            <Redirect
              to={{
                pathname: "/",
                state: { from: props.location }
              }}
            />
          )}
        />
      );
    }
  } else {
    return (
      <Route
        {...rest}
        render={props => (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: props.location }
            }}
          />
        )}
      />
    );
  }
};
