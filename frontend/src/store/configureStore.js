import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

let createLogger;
if (process.env.NODE_ENV !== 'production') {
  /* eslint-disable global-require */
  createLogger = require('redux-logger');
  /* eslint-enable global-require */
}

export default function configureStore(preloadedState) {
  const middleware = createLogger ? applyMiddleware(thunk, createLogger()) : applyMiddleware(thunk);

  const store = createStore(
    rootReducer,
    preloadedState,
    middleware
  );

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      /* eslint-disable global-require */
      const nextReducer = require('../reducers').default;
      /* eslint-enable global-require */
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
