import React, { Component, PropTypes } from 'react';

export default class InputPassword extends Component {

  render() {
    return (
      <input
        type="password"
        placeholder={this.props.placeholder}
        size={this.props.size}
      />
    );
  }

}

InputPassword.propTypes = {
  placeholder: PropTypes.string,
  size: PropTypes.number,
};

InputPassword.defaultProps = {
  placeholder: '',
  size: 30,
};
