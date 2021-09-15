import React from 'react';
import { compose } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import { GlobalStateType } from '../../redux/redux-store';

import { actions as messagesActions } from '../../redux/messages-reducer';
import withAuthRedirect from '../../hoc/withAuthRedirect';

import Messages from './Messages';

const mapStateToProps = (state: GlobalStateType) => {
  return {
    messages: state.messagesPage.messages,
    contacts: state.messagesPage.contacts,
  };
};

const connector = connect(mapStateToProps, {
  sendMessage: messagesActions.sendMessage,
});

type MappedPropsType = ConnectedProps<typeof connector>;
type OwnProps = {};
export type PropsType = MappedPropsType & OwnProps;

export default compose<React.ComponentType>(
  connector,
  withAuthRedirect
)(Messages);
