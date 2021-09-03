import React from 'react';
import { connect } from 'react-redux';
import { logOut } from '../../redux/auth-reducer';

import {
  selectIsAuth,
  selectUserAuthLogin,
  selectUserAuthProfile,
} from '../../redux/selectors/auth-selectors';

import Header from './Header';

class HeaderContainer extends React.Component {
  render() {
    return <Header {...this.props} />;
  }
}

const mapStateToProps = (state) => ({
  isAuth: selectIsAuth(state),
  login: selectUserAuthLogin(state),
  profile: selectUserAuthProfile(state),
});

export default connect(mapStateToProps, {
  logOut,
})(HeaderContainer);
