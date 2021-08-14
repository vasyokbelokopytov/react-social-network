import { connect } from 'react-redux';

import { logIn } from '../../redux/auth-reducer';
import { selectIsAuth } from '../../redux/selectors/auth-selectors';

import Login from './Login';

const mapStateToProps = (state) => ({
  isAuth: selectIsAuth(state),
});

export default connect(mapStateToProps, {
  logIn,
})(Login);
