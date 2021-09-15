import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { GlobalStateType } from '../../redux/redux-store';

import { logOut } from '../../redux/auth-reducer';

import {
  selectIsAuth,
  selectUserAuthLogin,
  selectUserAuthProfile,
} from '../../redux/selectors/auth-selectors';

import Header from './Header';

class HeaderContainer extends React.Component<PropsType> {
  render() {
    return <Header {...this.props} />;
  }
}

const mapStateToProps = (state: GlobalStateType) => ({
  isAuth: selectIsAuth(state),
  login: selectUserAuthLogin(state),
  profile: selectUserAuthProfile(state),
});

const connector = connect(mapStateToProps, { logOut });

type MappedPropsType = ConnectedProps<typeof connector>;
type OwnPropsType = {};
export type PropsType = MappedPropsType & OwnPropsType;

export default connector(HeaderContainer);
