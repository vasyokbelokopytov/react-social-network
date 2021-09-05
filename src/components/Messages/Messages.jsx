import React from 'react';
import styles from './Messages.module.css';

import Contact from './Contact/Contact';
import Message from './Message/Message';
import MessagesForm from './MessagesForm/MessagesForm';
import ComingSoon from '../common/ComingSoon/ComingSoon';

const Messages = (props) => {
  let messageElements = props.messages.map((message) => {
    return (
      <Message
        key={message.id}
        id={message.id}
        sender={message.sender}
        date={message.date}
        text={message.text}
      />
    );
  });

  let contactElements = props.contacts.map((contact) => {
    return (
      <Contact
        key={contact.id}
        id={contact.id}
        img={contact.img}
        name={contact.name}
        date={contact.date}
        text={contact.text}
      />
    );
  });

  const submitHandler = (data) => {
    props.sendMessage(data.message);
  };

  return (
    <section className={styles.messages}>
      <section className={styles.window}>
        <div className={styles.display}>{messageElements}</div>
        <MessagesForm onSubmit={submitHandler} />
      </section>
      <section className={styles.contacts}>{contactElements}</section>
      <ComingSoon />
    </section>
  );
};

export default Messages;
