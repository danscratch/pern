import React, { PropTypes } from 'react';
import PureComponent from './PureComponent';

export default class InputSubmit extends PureComponent {

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
