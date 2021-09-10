import { connect } from 'react-redux';

import { FormThunkType, logIn } from '../../redux/auth-reducer';
import { GlobalStateType } from '../../redux/redux-store';
import {
  selectCaptchaUrl,
  selectIsAuth,
} from '../../redux/selectors/auth-selectors';

import Login from './Login';

type mapStatePropsType = {
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

export type PropsType = mapStatePropsType & MapDispatchPropsType & OwnPropsType;

const mapStateToProps = (state: GlobalStateType): mapStatePropsType => ({
  isAuth: selectIsAuth(state),
  captchaUrl: selectCaptchaUrl(state),
});

export default connect<
  mapStatePropsType,
  MapDispatchPropsType,
  OwnPropsType,
  GlobalStateType
>(mapStateToProps, {
  logIn,
})(Login);
