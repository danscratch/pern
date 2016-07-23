import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import InputText from '../components/InputText';
import InputPassword from '../components/InputPassword';
import InputSubmit from '../components/InputSubmit';
import { signup } from '../actions/user';

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.onClickSignUp = this.onClickSignUp.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  componentWillMount() {
    this.state = {
      username: '',
      password: '',
      email: '',
      firstName: '',
      lastName: '',
    };
  }

  onClickSignUp() {
    this.props.signup({
      username: this.state.username,
      password: this.state.password,
      email: this.state.email,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
    });
  }

  onChangeUsername(e) { this.setState({ username: e.target.value }); }
  onChangePassword(e) { this.setState({ password: e.target.value }); }
  onChangeEmail(e) { this.setState({ email: e.target.value }); }
  onChangeFirstName(e) { this.setState({ firstName: e.target.value }); }
  onChangeLastName(e) { this.setState({ lastName: e.target.value }); }

  onKeyDown(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.onClickSignUp();
    }
  }

  render() {
    return (
      <div>
        Sign Up
        <div><InputText placeholder="username" autoFocus onChange={this.onChangeUsername} value={this.state.username} /></div>
        <div><InputPassword placeholder="password" ref="password" onChange={this.onChangePassword} /></div>
        <div><InputText placeholder="email" onChange={this.onChangeEmail} value={this.state.email} /></div>
        <div><InputText placeholder="first name" onChange={this.onChangeFirstName} value={this.state.firstName} /></div>
        <div><InputText placeholder="last name" onChange={this.onChangeLastName} value={this.state.lastName} onKeyDown={this.onKeyDown} /></div>
        <div><InputSubmit onClick={this.onClickSignUp} value="sign up" /></div>
      </div>
    );
  }

}

SignupForm.propTypes = {
  signup: PropTypes.func.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {};
}

export default connect(mapStateToProps, {
  signup,
})(SignupForm);
