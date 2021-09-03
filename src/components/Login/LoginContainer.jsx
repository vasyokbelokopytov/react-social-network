import { connect } from 'react-redux';

import { logIn } from '../../redux/auth-reducer';
import {
  selectCaptchaUrl,
  selectIsAuth,
} from '../../redux/selectors/auth-selectors';

import Login from './Login';

const mapStateToProps = (state) => ({
  isAuth: selectIsAuth(state),
  captchaUrl: selectCaptchaUrl(state),
});

export default connect(mapStateToProps, {
  logIn,
})(Login);
