import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import routes from '../routes';
import DevTools from './DevTools';
import { Router } from 'react-router';

import { fetchUser } from '../actions/user';
import { Config } from '../globals';

require('./Root.scss');

export default class Root extends Component {
  componentWillMount() {
    const userId = 1;
    if (userId) {
      this.props.store.dispatch(fetchUser(userId));
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
