import React, { Component, PropTypes } from 'react';
import _ from 'lodash';

export default class InputPassword extends Component {

  render() {
    return (
      <input
        type="password"
        placeholder={this.props.placeholder}
        size={this.props.size}
        onBlur={this.props.onBlur}
        onChange={this.props.onChange}
        onKeyDown={this.props.onKeyDown}
      />
    );
  }

}

InputPassword.propTypes = {
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  placeholder: PropTypes.string,
  size: PropTypes.number,
};

InputPassword.defaultProps = {
  onBlur: _.noop,
  onChange: _.noop,
  onKeyDown: _.noop,
  placeholder: '',
  size: 30,
};
