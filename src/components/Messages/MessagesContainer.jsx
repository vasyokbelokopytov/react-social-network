import { connect } from 'react-redux';
import {
  sendMessageActionCreator,
  updateNewMessageTextActionCreator,
} from '../../redux/messages-reducer';

import Messages from './Messages';

const mapStateToProps = (state) => {
  return {
    messages: state.messagesPage.messages,
    contacts: state.messagesPage.contacts,
    newMessageText: state.messagesPage.newMessageText,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateNewMessageText: (text) => {
      dispatch(updateNewMessageTextActionCreator(text));
    },
    sendMessage: () => {
      dispatch(sendMessageActionCreator());
    },
  };
};

const MessagesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Messages);

export default MessagesContainer;
