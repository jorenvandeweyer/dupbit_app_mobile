import React, {Component} from 'react';
import { View } from 'react-native';
import * as styles from '../style/styles.dark';

import Device from '../components/Device';
import FooterButton from '../components/FooterButton';

export default class Device extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.session = this.props.parent.session;
    }



    render() {
        return (
            <View>
                <View style={[styles.device.header, styles.defaults.row]}>
                    <Text>TITLE</Text>
                    <FooterButton
                        img={require("../icons/cog_bordered.png")}/>
                </View>
            </View>
        );
    }
}
