import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Login from '../components/Login';
import { Auth } from '../services/auth';

require('./Homepage.scss');

class Homepage extends Component {
  render() {
    let contents;

    if (Auth.isLoggedIn()) {
      const { user } = this.props;
      if (user) {
        contents = `Welcome, ${user.firstName}`;
      } else {
        contents = 'Welcome';
      }
    } else {
      contents = (<Login />);
    }

    return (
      <div className="homepage__block">
        {contents}
      </div>
    );
  }
}

Homepage.propTypes = {
  user: PropTypes.object,
};


function mapStateToProps(state, ownProps) {
  return {
    user: state.user.userData,
  };
}

export default connect(mapStateToProps, {
})(Homepage);
