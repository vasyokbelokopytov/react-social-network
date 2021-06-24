import { connect } from 'react-redux';
import {
  sendMessageAC,
  updateNewMessageTextAC,
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
      dispatch(updateNewMessageTextAC(text));
    },
    sendMessage: () => {
      dispatch(sendMessageAC());
    },
  };
};

const MessagesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Messages);

export default MessagesContainer;
