import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { RootState } from '../redux/store';

type MapStateToPropsType = {
  isAuth: boolean;
};

function withAuthRedirect<P>(Component: React.ComponentType<P>) {
  const containerComponent: React.FC<MapStateToPropsType> = (props) => {
    if (!props.isAuth) return <Redirect to="login" />;
    return <Component {...(props as unknown as P)} />;
  };

  const mapStateToProps = (state: RootState): MapStateToPropsType => ({
    isAuth: state.auth.isAuth,
  });

  return connect<MapStateToPropsType, {}, P, RootState>(mapStateToProps)(
    containerComponent
  );
}

export default withAuthRedirect;
