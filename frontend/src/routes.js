import React from 'react';
import { IndexRoute, Route } from 'react-router';
import App from './containers/App.jsx';
import Homepage from './containers/Homepage.jsx';
import Signup from './containers/Signup.jsx';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Homepage} />
    <Route path="signup" component={Signup} />
  </Route>
);
