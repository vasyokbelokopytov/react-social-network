import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { GlobalStateType } from '../redux/redux-store';
import { selectIsAuth } from '../redux/selectors/auth-selectors';

type MapStateToPropsType = {
  isAuth: boolean;
};

function withAuthRedirect<P>(Component: React.ComponentType<P>) {
  const containerComponent: React.FC<MapStateToPropsType> = (props) => {
    if (!props.isAuth) return <Redirect to="login" />;
    return <Component {...(props as unknown as P)} />;
  };

  const mapStateToProps = (state: GlobalStateType): MapStateToPropsType => ({
    isAuth: selectIsAuth(state),
  });

  return connect<MapStateToPropsType, {}, P, GlobalStateType>(mapStateToProps)(
    containerComponent
  );
}

export default withAuthRedirect;
