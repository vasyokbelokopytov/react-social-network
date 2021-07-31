const SEND_MESSAGE = 'SEND-MESSAGE';

const initialState = {
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
};

const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_MESSAGE:
      const newMessage = {
        id: state.messages.length + 1,
        sender: 'self',
        date: getStringDate(),
        text: action.message,
      };

      return {
        ...state,
        messages: [...state.messages, newMessage],
      };

      function getStringDate() {
        const date = new Date();
        const minutes = addZeros(date.getMinutes());
        const dayTime = date.getHours() < 12 ? 'AM' : 'PM';
        const hours = addZeros(
          date.getHours() > 12 ? date.getHours() - 12 : date.getHours()
        );

        function addZeros(num) {
          return num < 10 ? `0${num}` : `${num}`;
        }

        return `${hours}:${minutes} ${dayTime}`;
      }

    default:
      return state;
  }
};

export const sendMessage = (message) => ({ type: SEND_MESSAGE, message });

export default messagesReducer;
