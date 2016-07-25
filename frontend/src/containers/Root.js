import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import routes from '../routes';
import DevTools from './DevTools';
import { Router } from 'react-router';
import { Config } from '../globals';
import { Auth } from '../services/auth';
import { UserActionTypes } from '../actions/user';

require('./Root.scss');

export default class Root extends Component {
  constructor(props) {
    super(props);
    this.handleStateChange = this.handleStateChange.bind(this);
  }

  componentWillMount() {
    this.unsubscribe = this.props.store.subscribe(this.handleStateChange);
  }

  componentWillUnmount() {
    this.unsubscribe();
    delete this.unsubscribe;
  }

  handleStateChange() {
    if (this.props.store.getState().action === UserActionTypes.USER_LOGOUT) {
      Auth.logout();
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
