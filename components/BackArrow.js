import React, {Component} from 'react';
import { TouchableOpacity, Image } from 'react-native';
import * as styles from '../style/styles.dark';

const image = require("../icons/arrow_back.png");

export default class BackArrow extends Component {

    render() {
        return (
            <TouchableOpacity
                onPress={this.props.onPress}
                style={{marginTop: 6, marginLeft: 12}}>
                <Image 
                    source={image}
                    style={styles.defaults.backArrow}/>
            </TouchableOpacity>
        );
    }
}
