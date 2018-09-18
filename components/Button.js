import React, {Component} from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from '../style/styles.dark';

export default class Button extends Component {

    render() {
        const { title } = this.props;
        return (
            <TouchableOpacity
                onPress={this.props.onPress}
                style={styles.button}>
                <Text style={styles.buttonText}>{title}</Text>
            </TouchableOpacity>
            
        );
    }
}
