import React, {Component} from 'react';
import { View, Text, TextInput } from 'react-native';
import Button from '../components/Button';
import * as styles from '../style/styles.dark';

import Session from '../src/session';

export default class LoginScreen extends Component {
    constructor (props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            error: "",
        };
    }

    login = async (username, password) => {
        const result = await Session.login(username, password);
        if (result && result.success) {
            this.props.onSuccess(result.token);
        } else {
            this.setState({error: "Invalid Credentials"});
        }
    }
    
    render() {
        return (
            <View style={styles.defaults.loginBackground}>
                <Text style={styles.defaults.loginLogo}>Dupbit</Text>
        { !!this.state.error && <Text style={styles.defaults.errorMessage}>{this.state.error}</Text> }
                <TextInput 
                    style={styles.defaults.loginFields}
                    onChangeText={(username) => this.setState({username})}
                    placeholder="Username"
                    placeholderTextColor="#999999"/>
                <TextInput 
                    style={styles.defaults.loginFields}
                    onChangeText={(password) => this.setState({password})}
                    placeholder="Password" 
                    secureTextEntry={true} 
                    placeholderTextColor="#999999"/>
                <Button 
                    onPress={() => {this.login(this.state.username, this.state.password)}}
                    title="Login"/>
            </View>
        );
    }
}

