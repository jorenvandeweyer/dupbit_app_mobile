import React, {Component} from 'react';
import { View, ActivityIndicator } from 'react-native';
import styles from '../style/styles.dark';

export default class LoadingScreen extends Component {
    render() {
        return (
            <View style={styles.loginBackground}>
                <ActivityIndicator style={{ position: 'absolute', top: '50%'}}/>
            </View>
        );
    }
}

