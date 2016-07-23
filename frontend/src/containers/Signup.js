import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import SignupForm from '../components/SignupForm';
import { browserHistory } from 'react-router';

require('./Signup.scss');


class Signup extends Component {
  constructor(props) {
    super(props);
    this.handleStateChange = this.handleStateChange.bind(this);
  }

  componentWillMount() {
    this.unsubscribe = this.context.store.subscribe(this.handleStateChange);
  }

  componentWillUnmount() {
    this.unsubscribe();
    delete this.unsubscribe;
  }

  handleStateChange() {
    const { store } = this.context;
    if (store.getState().user.userData) {
      browserHistory.push('/');
    }
  }

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

Signup.contextTypes = {
  store: PropTypes.object,
};

function mapStateToProps(state, ownProps) {
  return {
    user: state.user.userData,
  };
}

export default connect(mapStateToProps, {})(Signup);
