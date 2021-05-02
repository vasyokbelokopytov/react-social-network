import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

import store from './redux/redux-store';

import App from './App';

const renderAll = (state) => {
  ReactDOM.render(
    <BrowserRouter>
      <App state={state} dispatch={store.dispatch.bind(store)} />
    </BrowserRouter>,
    document.getElementById('root')
  );
};

renderAll(store.getState());

store.subscribe(() => {
  const state = store.getState();
  renderAll(state);
});
