import { profileAPI } from '../api/api';

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET-USER-PROFILE';
const SET_USER_STATUS = 'SET-USER-STATUS';

const initialState = {
  profile: null,
  status: '',
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
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      const newPost = {
        id: state.posts.length + 1,
        name: 'Vasiliy Belokopytov',
        date: getStringDate(),
        text: action.post,
      };

      return {
        ...state,
        posts: [...state.posts, newPost],
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

    case SET_USER_PROFILE:
      return {
        ...state,
        profile: action.profile,
      };

    case SET_USER_STATUS:
      return {
        ...state,
        status: action.status,
      };

    default:
      return state;
  }
};

export const setUserProfile = (profile) => ({
  type: SET_USER_PROFILE,
  profile,
});

export const setUserStatus = (status) => ({
  type: SET_USER_STATUS,
  status,
});

export const addPost = (post) => ({ type: ADD_POST, post });

export const getUserProfile = (id) => {
  return (dispatch) => {
    profileAPI.getProfile(id).then((data) => {
      dispatch(setUserProfile(data));
    });
  };
};

export const getUserStatus = (id) => {
  return (dispatch) => {
    profileAPI.getStatus(id).then((data) => {
      dispatch(setUserStatus(data));
    });
  };
};

export const updateUserStatus = (status) => {
  return (dispatch) => {
    profileAPI.updateStatus(status).then((data) => {
      if (data.resultCode === 0) {
        dispatch(setUserStatus(status));
      }
    });
  };
};

export default profileReducer;
