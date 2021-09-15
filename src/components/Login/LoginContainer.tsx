import { connect, ConnectedProps } from 'react-redux';
import { GlobalStateType } from '../../redux/redux-store';

import { logIn } from '../../redux/auth-reducer';

import {
  selectCaptchaUrl,
  selectIsAuth,
} from '../../redux/selectors/auth-selectors';

import Login from './Login';

const mapStateToProps = (state: GlobalStateType) => ({
  isAuth: selectIsAuth(state),
  captchaUrl: selectCaptchaUrl(state),
});

const connector = connect(mapStateToProps, { logIn });

type MappedPropsType = ConnectedProps<typeof connector>;
type OwnPropsType = {};
export type PropsType = MappedPropsType & OwnPropsType;

export default connector(Login);
