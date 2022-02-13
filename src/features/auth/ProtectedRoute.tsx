import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks/redux';

interface Props {
  allowWithParam?: string;
}

export const ProtectedRoute: React.FC<RouteProps & Props> = ({
  children,
  allowWithParam,
  ...rest
}) => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  return (
    <Route
      {...rest}
      render={({ match, location }) => {
        const paramAccess = allowWithParam && match.params[allowWithParam];

        if (paramAccess || isAuth) {
          return children;
        }

        return (
          <Redirect
            to={{
              pathname: '/sign-in',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};
