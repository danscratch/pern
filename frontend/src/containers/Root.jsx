import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import routes from '../routes';
import DevTools from './DevTools';
import { Router } from 'react-router';

import { fetchUser, login } from '../actions/user';
import { Config } from '../globals';
import { Auth } from '../services/auth';

require('./Root.scss');

export default class Root extends Component {
  componentWillMount() {
    if (Auth.isLoggedIn()) {
      this.props.store.dispatch(fetchUser());
    } else {
      this.props.store.dispatch(login('DanCast', 'password'));
    }
  }

  render() {
    const { store, history } = this.props;
    const tools = Config.SHOW_DEVTOOLS ? (<DevTools />) : null;

    return (
      <Provider store={store}>
        <div>
          <Router history={history} routes={routes} />
          {tools}
        </div>
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};
