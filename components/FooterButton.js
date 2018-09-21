import React, {Component} from 'react';
import { TouchableOpacity, Image } from 'react-native';
import * as style from '../style/styles.dark';

export default class FooterButton extends Component {

    render() {
        const img = this.props.img;
        const selected = ('selected' in this.props);
        return (
            <TouchableOpacity
                onPress={this.props.onPress}>
                <Image 
                    source={img}/>
            </TouchableOpacity>
        );
    }
}
