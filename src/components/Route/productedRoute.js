import Cookies from 'js-cookie';
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const ProtectedRoute = ({ component: Component, ...rest }) => {
    
    var uyeid = Cookies.get("uyeid");
  return (
    <Route {...rest} render={
      props => {
        if (uyeid) {
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

