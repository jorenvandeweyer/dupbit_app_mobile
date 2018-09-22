import React, {Component} from 'react';
import { Alert } from 'react-native'
import * as styles from '../style/styles.dark';
import { ScrollView } from 'react-native-gesture-handler';

import SettingsButton from '../components/SettingsButton';

import Navigator from '../src/Navigator';

export default class KeysScreen extends Component {
    static navigationOptions = ({navigation}) => {
        const { state } = navigation;
        return {
            title: `${state.params.identifier} Settings`,
        };
    }

    askRevoke = () => {
        Alert.alert(
            'Revoke Key',
            'Revoke the authentication key for this device.',
            [
                {text: 'Revoke', onPress: () => this.revoke(), style: 'destructive'},
                {text: 'Cancel', style: 'cancel'},
            ],
            { cancelable: true }
        )
    }

    revoke = async () => {
        const tid = this.props.navigation.state.params.id;
        const session = Navigator.getSession();
        const result = await session.sendAPICall({
            tid,
        }, {
            path: "/api/account/removeToken",
            method: "GET",
        });

        if (result && result.success) {
            Navigator.getControl("refreshDevices")();
            Navigator.navigate("List");
        } else {
            Alert.alert("Failed to revoke key",
                "Please try again later.",
                [{text: 'Ok'}]
            )
        }


    }

    render() {
        return (
            <ScrollView style={styles.defaults.container}>
                <SettingsButton
                    title="Revoke Key Device"
                    img={require("../icons/times.png")}
                    onPress={this.askRevoke} />
            </ScrollView>
        );
    }
}

