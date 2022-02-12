import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks/redux';

export const ProtectedRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/sign-in',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
