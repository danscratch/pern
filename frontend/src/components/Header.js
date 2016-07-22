import React, { PropTypes } from 'react';
import PureComponent from './PureComponent';

export default class Header extends PureComponent {
  render() {
    let logoutLink;
    if (this.props.user) {
      logoutLink = (
        <a href="/logout">logout</a>
      );
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#3b5998' }}>
        <div style={{ padding: '5px', color: 'white' }}>PERN Stack</div>
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
