import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Footer from '../components/Footer';
import Header from '../components/Header';

class App extends Component {
  render() {
    return (
      <div>
        <Header user={this.props.user} />
        <div>HELLO WORLD</div>
        <div>
          {this.props.children}
        </div>
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
