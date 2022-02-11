import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';
import { store } from './app/store';
import { Provider } from 'react-redux';

import './index.css';
import { App } from './App';

ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <QueryParamProvider ReactRouterRoute={Route}>
        <Provider store={store}>
          <App />
        </Provider>
      </QueryParamProvider>
    </BrowserRouter>
  </StrictMode>,
  document.getElementById('root')
);
