import React, {Component} from 'react';
import { TouchableOpacity, Image } from 'react-native';
import * as styles from '../style/styles.dark';

export default class FooterButton extends Component {

    render() {
        return (
            <TouchableOpacity
                onPress={this.props.onPress}
                style={{marginTop: 6, marginRight: 12}}>
                <Image 
                    source={require("../icons/cog.png")}/>
            </TouchableOpacity>
        );
    }
}
