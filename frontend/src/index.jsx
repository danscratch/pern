import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App.jsx';
import configureStore from './store/configureStore.js';
import { fetchUser } from './actions/user.js';

const store = configureStore();

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

store.dispatch(fetchUser(1))
  .then(() => {
    console.log(JSON.stringify(store.getState(), null, 2));
  });
