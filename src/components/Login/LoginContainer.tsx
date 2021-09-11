import { connect } from 'react-redux';

import { FormThunkType, logIn } from '../../redux/auth-reducer';
import { GlobalStateType } from '../../redux/redux-store';
import {
  selectCaptchaUrl,
  selectIsAuth,
} from '../../redux/selectors/auth-selectors';

import Login from './Login';

type MapStatePropsType = {
  isAuth: boolean;
  captchaUrl: string | null;
};

type MapDispatchPropsType = {
  logIn: (
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string | null
  ) => FormThunkType;
};

type OwnPropsType = {};

export type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

const mapStateToProps = (state: GlobalStateType): MapStatePropsType => ({
  isAuth: selectIsAuth(state),
  captchaUrl: selectCaptchaUrl(state),
});

export default connect<
  MapStatePropsType,
  MapDispatchPropsType,
  OwnPropsType,
  GlobalStateType
>(mapStateToProps, {
  logIn,
})(Login);
