import React, {Component} from 'react';
import * as styles from '../style/styles.dark';
import { ScrollView } from 'react-native-gesture-handler';

import SettingsButton from '../components/SettingsButton';

export default class SettingsScreen extends Component {
    static navigationOptions = {
        title: "Settings",
    };

    click = async () => {
        console.log("click");
    }

    render() {

        return (
            <ScrollView style={styles.defaults.container}>
                <SettingsButton
                    title="Profile"
                    img={require("../icons/profile.png")}
                    onPress={this.click} />
                <SettingsButton
                    title="Logout"
                    img={require("../icons/logout.png")}
                    onPress={this.props.screenProps.logout} />
            </ScrollView>
        );
    }
}

