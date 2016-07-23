import React, { Component, PropTypes } from 'react';

export default class InputSubmit extends Component {

  render() {
    return (
      <input
        type="submit"
        value={this.props.value}
        onClick={this.props.onClick}
      />
    );
  }

}

InputSubmit.propTypes = {
  onClick: PropTypes.func.isRequired,
  value: PropTypes.string,
};

InputSubmit.defaultProps = {
  value: 'submit',
};
