import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
// import LoginForm from '../components/LoginForm';
// import { Auth } from '../services/auth';


export default class Homepage extends Component {
  render() {
    // let contents;
    //
    // if (Auth.isLoggedIn()) {
    //   const { user } = this.props;
    //   if (user) {
    //     contents = `Welcome, ${user.firstName}`;
    //   } else {
    //     contents = 'Welcome';
    //   }
    // } else {
    //   contents = (<LoginForm />);
    // }
    //
    // return (
    //   <div className="homepage__tile">
    //     {contents}
    //   </div>
    // );
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
