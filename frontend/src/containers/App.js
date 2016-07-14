import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div>HELLO WORLD</div>
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  // Injected by React Router
  children: PropTypes.node
}

function mapStateToProps(state, ownProps) {
  return {
    user: state.user.userData,
  }
}

export default connect(mapStateToProps, {})(App)
