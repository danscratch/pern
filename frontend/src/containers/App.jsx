import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Footer from '../components/Footer.jsx';
import Header from '../components/Header.jsx';

class App extends Component {
  render() {
    return (
      <div>
        <Header user={this.props.user} />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

App.propTypes = {
  // Injected by React Router
  children: PropTypes.node,
  user: PropTypes.object,
};

function mapStateToProps(state, ownProps) {
  return {
    user: state.user.userData,
  };
}

export default connect(mapStateToProps, {})(App);
