import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Redirect, withRouter, RouteComponentProps } from 'react-router-dom';

import { selectIsAuth } from '../redux/selectors/auth-selectors';
import { GlobalStateType } from '../redux/redux-store';

type MapStateToPropsType = {
  isAuth: boolean;
};

type RouterParamsType = {
  userId: string;
};

type RouterPropsType = RouteComponentProps<RouterParamsType>;

function withOwnerRedirect<P>(Component: React.ComponentType<P>) {
  const containerComponent: React.FC<MapStateToPropsType & RouterPropsType> = (
    props
  ) => {
    if (!props.isAuth && !props.match.params.userId)
      return <Redirect to="login" />;
    return <Component {...(props as unknown as P)} />;
  };

  const mapStateToProps = (state: GlobalStateType): MapStateToPropsType => ({
    isAuth: selectIsAuth(state),
  });

  return compose<React.ComponentType<P>>(
    connect<MapStateToPropsType, {}, P, GlobalStateType>(mapStateToProps),
    withRouter
  )(containerComponent);
}

export default withOwnerRedirect;
