import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';


class Homepage extends Component {

  render() {
    const { user } = this.props;
    const text = !!user ? 'logged in' : 'not logged in';

    return (
      <div>
        {text}
      </div>
    );
  }
}

Homepage.propTypes = {
  user: PropTypes.object,
};

function mapStateToProps(state, ownProps) {
  return {
    user: state.user.userData,
  };
}

export default connect(mapStateToProps, {})(Homepage);
