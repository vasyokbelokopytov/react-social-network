import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';

import { selectIsAuth } from '../redux/selectors/auth-selectors';

const withOwnerRedirect = (Component) => {
  const containerComponent = ({ isAuth, ...props }) => {
    if (!isAuth && !props.match.params.userId) return <Redirect to="login" />;
    return <Component {...props} />;
  };

  const mapStateToProps = (state) => ({
    isAuth: selectIsAuth(state),
  });

  return compose(connect(mapStateToProps), withRouter)(containerComponent);
};

export default withOwnerRedirect;
