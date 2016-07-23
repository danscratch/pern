import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import SignupForm from '../components/SignupForm';

require('./Signup.scss');


class Signup extends Component {

  render() {
    return (
      <div className="signup__tile">
        <SignupForm />
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
