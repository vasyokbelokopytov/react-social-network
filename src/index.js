import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import store from './redux/redux-store';
import { Provider } from 'react-redux';

import './index.css';
import App from './App';

const renderAll = (state) => {
  ReactDOM.render(
    <BrowserRouter>
      <Provider store={store}>
        <App
        // store={store}
        // state={state}
        // dispatch={store.dispatch.bind(store)}
        />
      </Provider>
    </BrowserRouter>,
    document.getElementById('root')
  );
};

renderAll(store.getState());

store.subscribe(() => {
  const state = store.getState();
  renderAll(state);
});
