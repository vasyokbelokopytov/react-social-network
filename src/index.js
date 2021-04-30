import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import state from './redux/state';
import { addPost } from './redux/state';
import App from './App';

ReactDOM.render(
  <BrowserRouter>
    <App state={state} addPost={addPost} />
  </BrowserRouter>,
  document.getElementById('root')
);
