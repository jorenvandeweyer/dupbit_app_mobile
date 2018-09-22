import React, {Component} from 'react';
import { View, ActivityIndicator } from 'react-native';
import * as styles from '../style/styles.dark';

export default class KeysScreen extends Component {
    render() {
        return (
            <View style={styles.defaults.loginBackground}>
                <ActivityIndicator style={{ position: 'absolute', top: '50%'}}/>
            </View>
        );
    }
}

