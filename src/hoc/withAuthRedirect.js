import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { selectIsAuth } from '../redux/selectors/auth-selectors';

const withAuthRedirect = (Component) => {
  const containerComponent = ({ isAuth, ...props }) => {
    if (!isAuth) return <Redirect to="login" />;
    return <Component {...props} />;
  };

  const mapStateToProps = (state) => ({
    isAuth: selectIsAuth(state),
  });

  return connect(mapStateToProps)(containerComponent);
};

export default withAuthRedirect;
