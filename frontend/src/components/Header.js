import React, { PropTypes } from 'react';
import PureComponent from './PureComponent';

require('./Header.scss');

export default class Header extends PureComponent {
  render() {
    let logoutLink;
    let signupLink;
    if (this.props.user) {
      logoutLink = (
        <a className="white" onClick={this.props.onClickLogout}>logout</a>
      );
    } else {
      signupLink = (
        <a className="white" onClick={this.props.onClickSignup}>sign up</a>
      );
    }

    return (
      <div className="header__div">
        <div><span onClick={this.props.onClickHome} style={{ cursor: 'pointer' }}>PERN Stack</span></div>
        <div>
          {logoutLink}
          {signupLink}
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  onClickHome: PropTypes.func.isRequired,
  onClickLogout: PropTypes.func.isRequired,
  onClickSignup: PropTypes.func.isRequired,
  user: PropTypes.object,
};
