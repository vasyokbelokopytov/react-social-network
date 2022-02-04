import React from 'react';
import { compose } from 'redux';
import { connect, ConnectedProps } from 'react-redux';

import { sendMessage } from '../../redux/messagesSlice';
import withAuthRedirect from '../../hoc/withAuthRedirect';

import Messages from './Messages';
import { RootState } from '../../redux/store';

const mapStateToProps = (state: RootState) => {
  return {
    messages: state.messages.messages,
    contacts: state.messages.contacts,
  };
};

const connector = connect(mapStateToProps, {
  sendMessage,
});

type MappedPropsType = ConnectedProps<typeof connector>;
type OwnProps = {};
export type PropsType = MappedPropsType & OwnProps;

export default compose<React.ComponentType>(
  connector,
  withAuthRedirect
)(Messages);
