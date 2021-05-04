import { connect } from 'react-redux';
import {
  addPostActionCreator,
  updateNewPostTextActionCreator,
} from '../../../redux/profile-reducer';

import Form from './Form';

const mapStateToProps = (state) => {
  return {
    newPostText: state.profilePage.newPostText,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateNewPostText: (newPostText) => {
      dispatch(updateNewPostTextActionCreator(newPostText));
    },
    addPost: () => {
      dispatch(addPostActionCreator());
    },
  };
};

const FormContainer = connect(mapStateToProps, mapDispatchToProps)(Form);

export default FormContainer;
