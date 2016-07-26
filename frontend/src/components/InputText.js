import React, { PropTypes } from 'react';
import PureComponent from './PureComponent';

export default class InputText extends PureComponent {

  render() {
    return (
      <input
        type="text"
        defaultValue={this.props.value}
        placeholder={this.props.placeholder}
        size={this.props.size}
        autoFocus={this.props.autoFocus}
        onBlur={this.props.onBlur}
        onChange={this.props.onChange}
        onKeyDown={this.props.onKeyDown}
      />
    );
  }

}

InputText.propTypes = {
  autoFocus: PropTypes.bool,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  placeholder: PropTypes.string,
  size: PropTypes.number,
  value: PropTypes.string,
};

InputText.defaultProps = {
  autoFocus: false,
  placeholder: '',
  size: 30,
  value: '',
};
