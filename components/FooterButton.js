import React, {Component} from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from '../style/styles.dark';

export default class FooterButton extends Component {

    render() {
        const { title, img } = this.props;
        return (
            <TouchableOpacity
                onPress={this.props.onPress}
                style={styles.footerButton}>
                <Text style={styles.buttonText}>{title}</Text>
            </TouchableOpacity>
            
        );
    }
}
