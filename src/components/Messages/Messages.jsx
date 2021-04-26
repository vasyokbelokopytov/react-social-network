import React from 'react';
import c from './Messages.module.css';

import Contact from './Contact/Contact';
import Message from './Message/Message';

const Messages = (props) => {
  return (
    <section className={c.messages}>
      <section className={c.window}>
        <div className={c.display}>
          <Message
            sender="foreign"
            date="22:30"
            text="          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam dolor molestiae eos inventore dolore nulla doloribus aperiam unde corporis cupiditate quibusdam, dignissimos voluptatum ipsa temporibus incidunt laborum mollitia dolorum doloremque vero dolores quod distinctio facilis enim! Soluta, sed. A ipsa officia accusamus, fugiat autem quibusdam excepturi velit inventore voluptas necessitatibus sed minus mollitia magni nam animi? Molestias modi debitis id voluptate quidem labore adipisci provident voluptates vel cumque quibusdam eligendi ut facilis dolorum, assumenda commodi quo. Porro eveniet sed nemo nobis, quidem aperiam molestias. Aut nostrum labore eius doloribus repellat, aperiam impedit cumque sed eaque reiciendis nihil cupiditate molestias officiis."
          />
          <Message sender="self" date="22:30" text="S" />
          <Message sender="foreign" date="22:30" text="Моя ответочка" />
        </div>
        <form className={c.form}>
          <textarea
            className={c.textarea}
            name="message"
            placeholder="You can write your message here..."
          ></textarea>
          <button className={c.submit} type="submit">
            <img
              className={c.icon}
              src="https://via.placeholder.com/27"
              alt="submit"
            />
          </button>
        </form>
      </section>
      <section className={c.contacts}>
        <Contact
          id="1"
          img="https://via.placeholder.com/90"
          name="Vasily Belokopytov"
          date="21:00"
          text="Я жостик"
        />
        <Contact
          id="2"
          img="https://via.placeholder.com/90"
          name="Тимур Будюков"
          date="Чт"
          text="Я не жостик"
        />
        <Contact
          id="3"
          img="https://via.placeholder.com/90"
          name="Денис Захлебаев"
          date="30.02.2021"
          text="Ну шо"
        />
        <Contact
          id="4"
          img="https://via.placeholder.com/90"
          name="Vasily Belokopytov"
          date="21:00"
          text="Я жостик"
        />
        <Contact
          id="5"
          img="https://via.placeholder.com/90"
          name="Vasily Belokopytov"
          date="21:00"
          text="Я жостик"
        />
        <Contact
          id="6"
          img="https://via.placeholder.com/90"
          name="Vasily Belokopytov"
          date="21:00"
          text="Я жостик"
        />
        <Contact
          id="7"
          img="https://via.placeholder.com/90"
          name="Vasily Belokopytov"
          date="21:00"
          text="Я жостик"
        />
        <Contact
          id="8"
          img="https://via.placeholder.com/90"
          name="Vasily Belokopytov"
          date="21:00"
          text="Я жостик"
        />
        <Contact
          id="9"
          img="https://via.placeholder.com/90"
          name="Vasily Belokopytov"
          date="21:00"
          text="Я жостик"
        />
      </section>
    </section>
  );
};

export default Messages;
