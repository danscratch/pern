import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import InputText from '../components/InputText.jsx';
import InputPassword from '../components/InputPassword.jsx';


class Signup extends Component {

  render() {
    return (
      <div>
        Signup page
        <div><InputText placeholder="username" /></div>
        <div><InputPassword placeholder="password" /></div>
      </div>
    );
  }
}

Signup.propTypes = {
  user: PropTypes.object,
};

function mapStateToProps(state, ownProps) {
  return {
    user: state.user.userData,
  };
}

export default connect(mapStateToProps, {})(Signup);
