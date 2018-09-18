import React, {Component} from 'react';
import { View, Text } from 'react-native';
import styles from '../style/styles.dark';

export default class Device extends Component {

    render() {
        const { data } = this.props;
        return (
            <View 
                style={styles.device} >
                <Text>{data.identifier}</Text>
                <Text>{data.tokenInfo.device}</Text>
                <Text>{data.tokenInfo.name}</Text>
            </View>            
        );
    }
}
