import { connect } from 'react-redux';
import { compose } from 'redux';

import {
  sendMessage,
  updateNewMessageText,
} from '../../redux/messages-reducer';
import withAuthRedirect from '../../hoc/withAuthRedirect';

import Messages from './Messages';

const mapStateToProps = (state) => {
  return {
    messages: state.messagesPage.messages,
    contacts: state.messagesPage.contacts,
    newMessageText: state.messagesPage.newMessageText,
  };
};

export default compose(
  connect(mapStateToProps, {
    updateNewMessageText,
    sendMessage,
  }),
  withAuthRedirect
)(Messages);
