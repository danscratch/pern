import React, { PropTypes } from 'react';
import PureComponent from './PureComponent';

require('./Header.scss');

export default class Header extends PureComponent {
  render() {
    let logoutLink;
    if (this.props.user) {
      logoutLink = (
        <a href="/logout" className="white">logout</a>
      );
    }

    return (
      <div className="header__div">
        <div>PERN Stack</div>
        <div>
          {logoutLink}
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  user: PropTypes.object,
};
