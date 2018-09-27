/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import firebase from 'firebase';
import {Header, Button, Spinner, Card, CardSection} from './components/common';
import LoginForm from './components/LoginForm';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {
  state = {loggedIn: null};

  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyCi1-e74Nj_7fw4rKr0uHka9HE8amhrr1M",
      authDomain: "auth-7e0d2.firebaseapp.com",
      databaseURL: "https://auth-7e0d2.firebaseio.com",
      projectId: "auth-7e0d2",
      storageBucket: "auth-7e0d2.appspot.com",
      messagingSenderId: "380158929359"
    });

    firebase.auth().onAuthStateChanged( (user) => {
      if(user) {
        this.setState({loggedIn: true});
      } else {
        this.setState({loggedIn: false});
      }
    }
    );
  }

  renderContent() {
    switch(this.state.loggedIn) {
      case true:
      return (
        <Card> 
          <CardSection>
          <Button onPress={() => firebase.auth().signOut()}>
            Log Out
          </Button>
           </CardSection>       
        </Card>

      )
      case false:
        return (<LoginForm></LoginForm>)
      default:
      return (      
      <Card> 
        <CardSection>
        <Spinner size='large' />
         </CardSection>       
      </Card>
      )

    }
  }

  render() {
    return (
      <View>
        <Header headerText='Authentication'></Header>
        {this.renderContent()}
      </View>
    );
  }
}
 
