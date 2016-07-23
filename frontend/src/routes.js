import React from 'react';
import { IndexRoute, Route } from 'react-router';
import App from './containers/App';
import Homepage from './containers/Homepage';
import Signup from './containers/Signup';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Homepage} />
    <Route path="signup" component={Signup} />
  </Route>
);
