import React, {Component} from 'react';
import {Button, Card, CardSection, Input} from './common';
import { Text } from 'react-native';
import firebase from 'firebase';
import { Spinner } from './common/Spinner';

class LoginForm extends Component {
    state = { email: '', password: '', error: '', loading: false}
 
    onButtonPress()  {
        const { email, password } = this.state;
        
        this.setState({error: '', loading: true});

        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(this.onLoginSuccess.bind(this))
        .catch(() => {
          firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(this.onLoginSuccess.bind(this))
            .catch(this.onLoginFail.bind(this));
        });
    }

    renderButton() {
        if (this.state.loading) {
            return <Spinner size='small'></Spinner>
        }

        return (
            <Button onPress={this.onButtonPress.bind(this)}>
                Log In
            </Button>
        )
    }

    onLoginSuccess() {
        this.setState({
            email: '',
            password: '',
            loading: false,
            error: ''
        })
    }

    onLoginFail() {
        this.setState({

            loading: false,
            error: 'Authetication Failed'
        })
    }
            
    render() {
        return ( 
            <Card> 
                <CardSection>
                    <Input 
                    placeHolder='user@gmail.com'
                    label='Email' 
                    value={this.state.email}
                    onChangeText={email => this.setState({ email })}
                    />
                </CardSection>
                <CardSection>
                <Input
                    secureTextEntry={true}
                    placeHolder='password'
                    label='Password'
                    value={this.state.password}
                    onChangeText={password => this.setState({ password })}
                    />
                </CardSection>
                <Text style={styles.errorTextStyle}>
                    {this.state.error}
                </Text>
                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>
        )
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
}



export default LoginForm;