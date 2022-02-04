import { createSlice } from '@reduxjs/toolkit';
import { ContactType, MessageType } from '../types/types';
import { getStringDate } from '../utilities/helpers/helpers';

interface MessagesState {
  contacts: ContactType[];
  messages: MessageType[];
}

const initialState: MessagesState = {
  contacts: [
    {
      id: 1,
      img: 'https://via.placeholder.com/90',
      name: 'Tena Deck',
      date: '21:00',
      text: 'Hi, how are you?',
    },
    {
      id: 2,
      img: 'https://via.placeholder.com/90',
      name: 'Angella Bough',
      date: '21:00',
      text: 'Hi, how are you?',
    },
    {
      id: 3,
      img: 'https://via.placeholder.com/90',
      name: 'Jayne Carrara',
      date: '21:00',
      text: 'Hi, how are you?',
    },
    {
      id: 4,
      img: 'https://via.placeholder.com/90',
      name: 'Doug Rosengarten',
      date: '21:00',
      text: 'Hi, how are you?',
    },
    {
      id: 5,
      img: 'https://via.placeholder.com/90',
      name: 'Barney Barone',
      date: '21:00',
      text: 'Hi, how are you?',
    },
    {
      id: 6,
      img: 'https://via.placeholder.com/90',
      name: 'Johnsie Courtemanche',
      date: '21:00',
      text: 'Hi, how are you?',
    },
    {
      id: 7,
      img: 'https://via.placeholder.com/90',
      name: 'Isela Ohler',
      date: '21:00',
      text: 'Hi, how are you?',
    },
    {
      id: 8,
      img: 'https://via.placeholder.com/90',
      name: 'Corinne Schwenk',
      date: '21:00',
      text: 'Hi, how are you?',
    },
    {
      id: 9,
      img: 'https://via.placeholder.com/90',
      name: 'Haley Dillion',
      date: '21:00',
      text: 'Hi, how are you?',
    },
    {
      id: 10,
      img: 'https://via.placeholder.com/90',
      name: 'Sheldon Yoshimura',
      date: '21:00',
      text: 'Hi, how are you?',
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

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    sendMessage: (state, action) => {
      const newMessage: MessageType = {
        id: state.messages.length + 1,
        sender: 'self',
        date: getStringDate(),
        text: action.payload,
      };

      state.messages.push(newMessage);
    },
  },
});

export const { sendMessage } = messagesSlice.actions;

export default messagesSlice.reducer;