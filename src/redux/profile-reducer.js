const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

const initialState = {
  posts: [
    {
      id: 1,
      name: 'Vasiliy Belokopytov',
      date: '20:10 PM · 16.04.20',
      text:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos, eveniet asperiores obcaecati maxime explicabo minima, quas labore aspernatur dolorem consequatur quis dolore commodi, numquam adipisci. Laudantium est impedit at, quasi dignissimos nemo consequuntur animi molestias nesciunt, aspernatur magni consequatur fugiat! Dolore, eligendi? At distinctio rerum inventore corrupti officiis quae quis necessitatibus, fuga aperiam nesciunt ex debitis. Architecto, provident labore! Laboriosam quibusdam architecto tempora perspiciatis. Maxime inventore soluta nobis eius rerum, eos obcaecati. Placeat ab ducimus officia dolor sed ut commodi provident libero et rerum dignissimos cumque repudiandae, vero maiores ad, temporibus natus voluptas odio iste accusantium, a deleniti quo esse.',
    },
    {
      id: 2,
      name: 'Vasiliy Belokopytov',
      date: '20:10 PM · 16.04.20',
      text:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos, eveniet asperiores obcaecati maxime explicabo minima, quas labore aspernatur dolorem consequatur quis dolore commodi, numquam adipisci. Laudantium est impedit at, quasi dignissimos nemo consequuntur animi molestias nesciunt, aspernatur magni consequatur fugiat! Dolore, eligendi? At distinctio rerum inventore corrupti officiis quae quis necessitatibus, fuga aperiam nesciunt ex debitis. Architecto, provident labore! Laboriosam quibusdam architecto tempora perspiciatis. Maxime inventore soluta nobis eius rerum, eos obcaecati. Placeat ab ducimus officia dolor sed ut commodi provident libero et rerum dignissimos cumque repudiandae, vero maiores ad, temporibus natus voluptas odio iste accusantium, a deleniti quo esse.',
    },
    {
      id: 3,
      name: 'Vasiliy Belokopytov',
      date: '20:10 PM · 16.04.20',
      text:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos, eveniet asperiores obcaecati maxime explicabo minima, quas labore aspernatur dolorem consequatur quis dolore commodi, numquam adipisci. Laudantium est impedit at, quasi dignissimos nemo consequuntur animi molestias nesciunt, aspernatur magni consequatur fugiat! Dolore, eligendi? At distinctio rerum inventore corrupti officiis quae quis necessitatibus, fuga aperiam nesciunt ex debitis. Architecto, provident labore! Laboriosam quibusdam architecto tempora perspiciatis. Maxime inventore soluta nobis eius rerum, eos obcaecati. Placeat ab ducimus officia dolor sed ut commodi provident libero et rerum dignissimos cumque repudiandae, vero maiores ad, temporibus natus voluptas odio iste accusantium, a deleniti quo esse.',
    },
    {
      id: 4,
      name: 'Vasiliy Belokopytov',
      date: '20:10 PM · 16.04.20',
      text:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos, eveniet asperiores obcaecati maxime explicabo minima, quas labore aspernatur dolorem consequatur quis dolore commodi, numquam adipisci. Laudantium est impedit at, quasi dignissimos nemo consequuntur animi molestias nesciunt, aspernatur magni consequatur fugiat! Dolore, eligendi? At distinctio rerum inventore corrupti officiis quae quis necessitatibus, fuga aperiam nesciunt ex debitis. Architecto, provident labore! Laboriosam quibusdam architecto tempora perspiciatis. Maxime inventore soluta nobis eius rerum, eos obcaecati. Placeat ab ducimus officia dolor sed ut commodi provident libero et rerum dignissimos cumque repudiandae, vero maiores ad, temporibus natus voluptas odio iste accusantium, a deleniti quo esse.',
    },
  ],
  newPostText: '',
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      const newPost = {
        id: state.posts.length + 1,
        name: 'Vasiliy Belokopytov',
        date: getStringDate(),
        text: state.newPostText,
      };

      return {
        ...state,
        posts: [...state.posts, newPost],
        newPostText: '',
      };

      function getStringDate() {
        const date = new Date();
        const minutes = addZeros(date.getMinutes());
        const day = addZeros(date.getDate());
        const month = addZeros(date.getMonth() + 1);
        const year = addZeros(date.getFullYear());
        const dayTime = date.getHours() < 12 ? 'AM' : 'PM';
        const hours = addZeros(
          date.getHours() > 12 ? date.getHours() - 12 : date.getHours()
        );

        function addZeros(num) {
          return num < 10 ? `0${num}` : `${num}`;
        }

        return `${hours}:${minutes} ${dayTime} · ${day}.${month}.${year}`;
      }

    case UPDATE_NEW_POST_TEXT:
      return {
        ...state,
        newPostText: action.text,
      };
    default:
      return state;
  }
};

export const addPostActionCreator = () => ({ type: ADD_POST });

export const updateNewPostTextActionCreator = (newPostText) => ({
  type: UPDATE_NEW_POST_TEXT,
  text: newPostText,
});

export default profileReducer;
