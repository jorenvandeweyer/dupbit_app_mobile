import React, {Component} from 'react';
import { View, Text, TextInput } from 'react-native';
import Button from '../components/Button';
import styles from '../style/styles.dark';

export default class LoginScreen extends Component {
    constructor (props) {
        super(props);
        this.state = {
            username: "",
            password: "",
        };
    }

    login(username, password) {
        this.props.onLogin(username, password);
    }
    render() {
        return (
            <View style={styles.loginBackground} >
                <Text style={styles.loginLogo}> Dupbit </Text>
                <TextInput 
                    style={styles.loginFields}
                    onChangeText={(username) => this.setState({username})}
                    placeholder="Username"
                    placeholderTextColor="#999999" />
                <TextInput 
                    style={styles.loginFields}
                    onChangeText={(password) => this.setState({password})}
                    placeholder="Password" 
                    secureTextEntry={true} 
                    placeholderTextColor="#999999"/>
                <Button 
                    onPress={() => {this.login(this.state.username, this.state.password)}}
                    title="Login" />
            </View>
        );
    }
}

