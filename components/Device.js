import React, {Component} from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import * as styles from '../style/styles.dark';

export default class Device extends Component {
    constructor(props) {
        super(props);
        this.data = this.props.data;

        this.device_info = {
            name: this.data.identifier,
            os: "os",
            type: this.data.tokenInfo.device,
            online: this.data.online,
        };

        try {
            if (this.data.tokenInfo.name) this.data.tokenInfo.name = JSON.parse(this.data.tokenInfo.name);
            this.device_info.os = this.data.tokenInfo.name.os;
        } catch (e) {

        }
    }

    render() {
        return (
            <TouchableOpacity 
                style={[styles.device.body, styles.defaults.row]}
                onPress={() => {this.props.onPress(this.data)}}>
                <View>
                    <View style={styles.defaults.row}>
                        <View style={[styles.device.circle, (!this.device_info.online ? styles.device.online:undefined)]}></View>
                        <Text style={styles.device.title}>{this.device_info.name}</Text>
                    </View>
                    <View style={styles.defaults.row}>
                        <Text style={styles.device.key}>type:</Text>
                        <Text style={styles.device.value}>{this.device_info.type}</Text>
                    </View>
                    <View style={styles.defaults.row}>
                        <Text style={styles.device.key}>os:</Text>
                        <Text style={styles.device.value}>{this.device_info.os}</Text>
                    </View>
                </View>
                <Image
                    style={{
                        alignSelf: "center",
                        marginLeft: "auto",
                        marginRight: 15
                    }}
                    source={require("../icons/angle-right-solid.png")}/>
            </TouchableOpacity>            
        );
    }
}
