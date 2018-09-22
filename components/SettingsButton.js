import React, {Component} from 'react';
import { TouchableOpacity, Text, Image } from 'react-native';
import * as styles from '../style/styles.dark';

export default class Button extends Component {

    render() {
        const { title, img } = this.props;
        return (
            <TouchableOpacity
                onPress={this.props.onPress}
                style={[styles.defaults.settingsButton, styles.defaults.row]}>
                <Image
                    source={img}
                    style={{
                        marginLeft: 10,
                    }} />
                <Text style={{
                    color: "#53575C",
                    fontSize: 24,
                    fontWeight: "bold",
                    marginLeft: 10,
                }}>{title}</Text>
            </TouchableOpacity>
            
        );
    }
}
