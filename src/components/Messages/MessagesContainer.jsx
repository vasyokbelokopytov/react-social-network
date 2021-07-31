import { connect } from 'react-redux';
import { compose } from 'redux';

import { sendMessage } from '../../redux/messages-reducer';
import withAuthRedirect from '../../hoc/withAuthRedirect';

import Messages from './Messages';

const mapStateToProps = (state) => {
  return {
    messages: state.messagesPage.messages,
    contacts: state.messagesPage.contacts,
  };
};

export default compose(
  connect(mapStateToProps, {
    sendMessage,
  }),
  withAuthRedirect
)(Messages);
