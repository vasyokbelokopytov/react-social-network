import React from 'react';
import styles from './Messages.module.css';

import Contact from './Contact/Contact';
import Message from './Message/Message';

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

  const textareaChangeHandler = (e) => {
    let text = e.target.value;
    props.updateNewMessageText(text);
  };

  const buttonClickHandler = (e) => {
    e.preventDefault();
    props.sendMessage();
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
            value={props.newMessageText}
            onChange={textareaChangeHandler}
          ></textarea>
          <button
            className={styles.submit}
            type="submit"
            onClick={buttonClickHandler}
          >
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
