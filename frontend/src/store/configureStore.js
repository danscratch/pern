import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';
import DevTools from '../containers/DevTools';
import { Config } from '../globals';

export default function configureStore(preloadedState) {
  const middleware = Config.SHOW_DEVTOOLS ? compose(applyMiddleware(thunk, createLogger()), DevTools.instrument()) : applyMiddleware(thunk, createLogger());

  const store = createStore(
    rootReducer,
    preloadedState,
    middleware
  );

  if (Config.ENVIRONMENT === 'dev' && module.hot) {
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
