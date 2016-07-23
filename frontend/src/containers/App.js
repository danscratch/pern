import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { logout, fetchUser } from '../actions/user';
import { Auth } from '../services/auth';
import { browserHistory } from 'react-router';


class App extends Component {
  constructor(props) {
    super(props);
    this.onClickLogout = this.onClickLogout.bind(this);
  }

  componentWillMount() {
    if (Auth.isLoggedIn()) {
      this.props.fetchUser();
    }
  }

  onClickLogout() {
    this.props.logout();
  }

  onClickSignup() {
    browserHistory.push('/signup');
  }

  onClickHome() {
    browserHistory.push('/');
  }

  render() {
    return (
      <div>
        <Header user={this.props.user} onClickLogout={this.onClickLogout} onClickSignup={this.onClickSignup} onClickHome={this.onClickHome} />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node,
  user: PropTypes.object,
  fetchUser: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    user: state.user.userData,
  };
}

export default connect(mapStateToProps, {
  fetchUser,
  logout,
})(App);
