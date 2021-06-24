import { connect } from 'react-redux';
import { addPostAC, updateNewPostTextAC } from '../../../redux/profile-reducer';

import Form from './Form';

const mapStateToProps = (state) => {
  return {
    newPostText: state.profilePage.newPostText,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateNewPostText: (newPostText) => {
      dispatch(updateNewPostTextAC(newPostText));
    },
    addPost: () => {
      dispatch(addPostAC());
    },
  };
};

const FormContainer = connect(mapStateToProps, mapDispatchToProps)(Form);

export default FormContainer;
