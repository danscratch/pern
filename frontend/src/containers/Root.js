import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import routes from '../routes';
import { Router } from 'react-router';
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

    return (
      <Provider store={store}>
        <div>
          <Router history={history} routes={routes} />
        </div>
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};
