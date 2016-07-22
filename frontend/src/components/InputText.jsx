import React, { Component, PropTypes } from 'react';

export default class InputText extends Component {

  render() {
    return (
      <input
        type="text"
        defaultValue={this.props.value}
        placeholder={this.props.placeholder}
        size={this.props.size}
      />
    );
  }

}

InputText.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  size: PropTypes.number,
};

InputText.defaultProps = {
  value: '',
  placeholder: '',
  size: 30,
};
