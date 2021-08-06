import { connect } from 'react-redux';

import { logIn } from '../../redux/auth-reducer';

import Login from './Login';

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, {
  logIn,
})(Login);
