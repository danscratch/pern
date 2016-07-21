import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import routes from '../routes';
import DevTools from './DevTools';
import { Router } from 'react-router';

require('./Root.scss');

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

export default class Root extends Component {
  render() {
    const { store, history } = this.props;
    const tools = IS_PRODUCTION ? null : (<DevTools />);

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
