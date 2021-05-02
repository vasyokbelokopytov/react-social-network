import React from 'react';
import styles from './Messages.module.css';

import Contact from './Contact/Contact';
import Message from './Message/Message';

import {
  sendMessageActionCreator,
  updateNewMessageTextActionCreator,
} from '../../redux/messages-reducer';

const Messages = (props) => {
  let messageElements = props.state.messages.map((message) => {
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

  let contactElements = props.state.contacts.map((contact) => {
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

  const updateNewMessageText = (e) => {
    let text = e.target.value;
    props.dispatch(updateNewMessageTextActionCreator(text));
  };

  const sendMessage = (e) => {
    e.preventDefault();
    props.dispatch(sendMessageActionCreator());
  };

  return (
    <section className={styles.messages}>
      <section className={styles.window}>
        <div className={styles.display}>{messageElements}</div>
        <form className={styles.form}>
          <textarea
            className={styles.textarea}
            name="message"
            placeholder="You can write your message here..."
            value={props.state.newMessageText}
            onChange={updateNewMessageText}
          ></textarea>
          <button className={styles.submit} type="submit" onClick={sendMessage}>
            <img
              className={styles.icon}
              src="https://via.placeholder.com/27"
              alt="submit"
            />
          </button>
        </form>
      </section>
      <section className={styles.contacts}>{contactElements}</section>
    </section>
  );
};

export default Messages;
