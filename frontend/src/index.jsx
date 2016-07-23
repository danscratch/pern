import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import configureStore from './store/configureStore';
import Root from './containers/Root';

/* eslint-disable import/no-unresolved */
// this line magically copies index.html into the build folder, courtesy of the file-loader plugin
require('file?name=[name].[ext]!./index.html');
/* eslint-enable import/no-unresolved */

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

render(
  <Root store={store} history={history} />,
  document.getElementById('root')
);
