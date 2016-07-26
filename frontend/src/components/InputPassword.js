import React, { PropTypes } from 'react';
import PureComponent from './PureComponent';

export default class InputPassword extends PureComponent {

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
  placeholder: '',
  size: 30,
};
