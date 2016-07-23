import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import InputText from '../components/InputText';
import InputPassword from '../components/InputPassword';
import InputSubmit from '../components/InputSubmit';
import { login } from '../actions/user';

class Login extends Component {
  constructor(props) {
    super(props);
    this.onClickLogin = this.onClickLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onKeyDownPassword = this.onKeyDownPassword.bind(this);
  }

  componentWillMount() {
    this.state = {
      username: '',
      password: '',
    };
  }

  onClickLogin() {
    this.props.login(this.state.username, this.state.password);
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  onKeyDownPassword(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.onClickLogin();
    }
  }

  render() {
    return (
      <div>
        Login
        <div><InputText placeholder="username" autoFocus onChange={this.onChangeUsername} value={this.state.username} /></div>
        <div><InputPassword placeholder="password" ref="password" onChange={this.onChangePassword} onKeyDown={this.onKeyDownPassword} /></div>
        <div><InputSubmit onClick={this.onClickLogin} value="login" /></div>
      </div>
    );
  }

}

Login.propTypes = {
  login: PropTypes.func.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {};
}

export default connect(mapStateToProps, {
  login,
})(Login);
