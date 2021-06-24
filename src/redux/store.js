import messagesReducer from './messages-reducer';
import profileReducer from './profile-reducer';

const store = {
  _state: {
    profilePage: {
      posts: [
        {
          id: 1,
          name: 'Vasiliy Belokopytov',
          date: '20:10 PM · 16.04.20',
          text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos, eveniet asperiores obcaecati maxime explicabo minima, quas labore aspernatur dolorem consequatur quis dolore commodi, numquam adipisci. Laudantium est impedit at, quasi dignissimos nemo consequuntur animi molestias nesciunt, aspernatur magni consequatur fugiat! Dolore, eligendi? At distinctio rerum inventore corrupti officiis quae quis necessitatibus, fuga aperiam nesciunt ex debitis. Architecto, provident labore! Laboriosam quibusdam architecto tempora perspiciatis. Maxime inventore soluta nobis eius rerum, eos obcaecati. Placeat ab ducimus officia dolor sed ut commodi provident libero et rerum dignissimos cumque repudiandae, vero maiores ad, temporibus natus voluptas odio iste accusantium, a deleniti quo esse.',
        },
        {
          id: 2,
          name: 'Vasiliy Belokopytov',
          date: '20:10 PM · 16.04.20',
          text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos, eveniet asperiores obcaecati maxime explicabo minima, quas labore aspernatur dolorem consequatur quis dolore commodi, numquam adipisci. Laudantium est impedit at, quasi dignissimos nemo consequuntur animi molestias nesciunt, aspernatur magni consequatur fugiat! Dolore, eligendi? At distinctio rerum inventore corrupti officiis quae quis necessitatibus, fuga aperiam nesciunt ex debitis. Architecto, provident labore! Laboriosam quibusdam architecto tempora perspiciatis. Maxime inventore soluta nobis eius rerum, eos obcaecati. Placeat ab ducimus officia dolor sed ut commodi provident libero et rerum dignissimos cumque repudiandae, vero maiores ad, temporibus natus voluptas odio iste accusantium, a deleniti quo esse.',
        },
        {
          id: 3,
          name: 'Vasiliy Belokopytov',
          date: '20:10 PM · 16.04.20',
          text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos, eveniet asperiores obcaecati maxime explicabo minima, quas labore aspernatur dolorem consequatur quis dolore commodi, numquam adipisci. Laudantium est impedit at, quasi dignissimos nemo consequuntur animi molestias nesciunt, aspernatur magni consequatur fugiat! Dolore, eligendi? At distinctio rerum inventore corrupti officiis quae quis necessitatibus, fuga aperiam nesciunt ex debitis. Architecto, provident labore! Laboriosam quibusdam architecto tempora perspiciatis. Maxime inventore soluta nobis eius rerum, eos obcaecati. Placeat ab ducimus officia dolor sed ut commodi provident libero et rerum dignissimos cumque repudiandae, vero maiores ad, temporibus natus voluptas odio iste accusantium, a deleniti quo esse.',
        },
        {
          id: 4,
          name: 'Vasiliy Belokopytov',
          date: '20:10 PM · 16.04.20',
          text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos, eveniet asperiores obcaecati maxime explicabo minima, quas labore aspernatur dolorem consequatur quis dolore commodi, numquam adipisci. Laudantium est impedit at, quasi dignissimos nemo consequuntur animi molestias nesciunt, aspernatur magni consequatur fugiat! Dolore, eligendi? At distinctio rerum inventore corrupti officiis quae quis necessitatibus, fuga aperiam nesciunt ex debitis. Architecto, provident labore! Laboriosam quibusdam architecto tempora perspiciatis. Maxime inventore soluta nobis eius rerum, eos obcaecati. Placeat ab ducimus officia dolor sed ut commodi provident libero et rerum dignissimos cumque repudiandae, vero maiores ad, temporibus natus voluptas odio iste accusantium, a deleniti quo esse.',
        },
      ],
      newPostText: '',
    },

    messagesPage: {
      contacts: [
        {
          id: 1,
          img: 'https://via.placeholder.com/90',
          name: 'Vasily Belokopytov',
          date: '21:00',
          text: 'Я жостик',
        },
        {
          id: 2,
          img: 'https://via.placeholder.com/90',
          name: 'Timur Budyukov',
          date: 'Чт',
          text: 'Я не жостик',
        },
        {
          id: 3,
          img: 'https://via.placeholder.com/90',
          name: 'Vasily Belokopytov',
          date: '21:00',
          text: 'Я жостик',
        },
        {
          id: 4,
          img: 'https://via.placeholder.com/90',
          name: 'Vasily Belokopytov',
          date: '21:00',
          text: 'Я жостик',
        },
        {
          id: 5,
          img: 'https://via.placeholder.com/90',
          name: 'Vasily Belokopytov',
          date: '21:00',
          text: 'Я жостик',
        },
        {
          id: 6,
          img: 'https://via.placeholder.com/90',
          name: 'Vasily Belokopytov',
          date: '21:00',
          text: 'Я жостик',
        },
        {
          id: 7,
          img: 'https://via.placeholder.com/90',
          name: 'Vasily Belokopytov',
          date: '21:00',
          text: 'Я жостик',
        },
        {
          id: 8,
          img: 'https://via.placeholder.com/90',
          name: 'Vasily Belokopytov',
          date: '21:00',
          text: 'Я жостик',
        },
        {
          id: 9,
          img: 'https://via.placeholder.com/90',
          name: 'Vasily Belokopytov',
          date: '21:00',
          text: 'Я жостик',
        },
        {
          id: 10,
          img: 'https://via.placeholder.com/90',
          name: 'Vasily Belokopytov',
          date: '21:00',
          text: 'Я жостик',
        },
      ],

      messages: [
        {
          id: 1,
          sender: 'foreign',
          date: '22:30',
          text: '          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam dolor molestiae eos inventore dolore nulla doloribus aperiam unde corporis cupiditate quibusdam, dignissimos voluptatum ipsa temporibus incidunt laborum mollitia dolorum doloremque vero dolores quod distinctio facilis enim! Soluta, sed. A ipsa officia accusamus, fugiat autem quibusdam excepturi velit inventore voluptas necessitatibus sed minus mollitia magni nam animi? Molestias modi debitis id voluptate quidem labore adipisci provident voluptates vel cumque quibusdam eligendi ut facilis dolorum, assumenda commodi quo. Porro eveniet sed nemo nobis, quidem aperiam molestias. Aut nostrum labore eius doloribus repellat, aperiam impedit cumque sed eaque reiciendis nihil cupiditate molestias officiis.',
        },
        {
          id: 2,
          sender: 'self',
          date: '22:21',
          text: 'sdvsdv',
        },
        {
          id: 3,
          sender: 'foreign',
          date: '22:14',
          text: '          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam dolor molestiae eos inventore dolore nulla doloribus aperiam unde corporis cupiditate quibusdam, dignissimos voluptatum ipsa temporibus inciam impedit cumque sed eaque reiciendis nihil cupiditate molestias officiis.',
        },
        {
          id: 4,
          sender: 'foreign',
          date: '22:30',
          text: 'bore adipisci provident voluptates vel cumque quibusdam eligendi ut facilis dolorum, assumenda commodi quo. Porro eveniet sed nemo nobis, quidem aperiam molestias. Aut nostrum labore eius doloribus repellat, aperiam impedit cumque sed eaque reiciendis nihil cupiditate molestias officiis.',
        },
        {
          id: 5,
          sender: 'foreign',
          date: '22:30',
          text: 'njnj',
        },
      ],

      newMessageText: '',
    },
  },

  get state() {
    return this._state;
  },

  _callSubscriber() {
    console.log('State is changed!');
  },

  subscribe(observer) {
    this._callSubscriber = observer;
  },

  dispatch(action) {
    this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.messagesPage = messagesReducer(
      this._state.messagesPage,
      action
    );

    this._callSubscriber(this._state);
  },
};

export default store;
