import React from 'react';
import styles from './Messages.module.css';

import Contact from './Contact/Contact';
import Message from './Message/Message';

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

  const textareaRef = React.createRef();

  const addMessage = (e) => {
    e.preventDefault();
    let message = textareaRef.current.value;
    alert(message);
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
            ref={textareaRef}
          ></textarea>
          <button className={styles.submit} type="submit" onClick={addMessage}>
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
