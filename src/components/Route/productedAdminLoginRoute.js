import Cookies from 'js-cookie';
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const ProtectedAdminLoginRoute = ({ component: Component, ...rest }) => {
    var id = Cookies.get("id");
  return (
    <Route {...rest} render={
      props => {
        if (!id) {
          return <Component {...rest} {...props} />
        } else {
          return <Redirect to={
            {
              pathname: '/',
              state: {
                from: props.location
              }
            }
          } />
        }
      }
    } />
  )
}

