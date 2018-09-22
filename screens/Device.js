import React, {Component} from 'react';
import { View, Text } from 'react-native';
import * as styles from '../style/styles.dark';

import Cog from '../components/Cog';
import SettingsButton from '../components/SettingsButton';

import Navigator from '../src/Navigator';
import { ScrollView } from 'react-native-gesture-handler';

export default class Device extends Component {
    static navigationOptions = ({navigation}) => {
        const { state } = navigation;
        return {
            title: `${state.params.identifier}`,
            headerRight: (
                <Cog
                    onPress={() => {Navigator.navigate("DeviceSettings", state.params)}}/>
            ),
        };
    }

    constructor(props) {
        super(props);

        const session = Navigator.getSession();
        const tid = this.props.navigation.state.params.id;

        this.state = {
            actions: [
                {
                    name: "display sleep",
                    onPress: async () => {
                        session.sendAPICall({
                            tid,
                            call: "/screen/displaysleep",
                            action: {
                                name: "screen", 
                                data: {
                                    action: "displaysleep",
                                },
                            },
                        });
                    },
                    icon: require("../icons/times.png"),
                    type: ['desktop'],
                },
                {
                    name: "display unlock",
                    onPress: async () => {
                        session.sendAPICall({
                            tid,
                            call: "/screen/unlock",
                            action: {
                                name: "screen",
                                data: {
                                    action: "unlock",
                                },
                            },
                        });
                    },
                    icon: require("../icons/times.png"),
                    type: ['desktop'],
                },
                {
                    name: "display lock",
                    onPress: async () => {
                        session.sendAPICall({
                            tid,
                            call: "/screen/lock",
                            action: {
                                name: "screen",
                                data: {
                                    action: "lock",
                                },
                            },
                        });
                    },
                    icon: require("../icons/times.png"),
                    type: ['desktop'],
                },
                {
                    name: "shutdown",
                    onPress: async () => {
                        session.sendAPICall({
                            tid,
                            call: "/device/shutdown",
                            action: {
                                name: "device",
                                data: {
                                    action: "shutdown",
                                },
                            },
                        });
                    },
                    icon: require("../icons/times.png"),
                    type: ['desktop'],
                },
                {
                    name: "volume get",
                    onPress: async () => {
                        const result = await session.sendAPICall({
                            tid,
                            call: "/volume/get",
                            action: {
                                name: "volume",
                                data: {
                                    action: "get",
                                },
                            },
                        });
                    },
                    icon: require("../icons/times.png"),
                    type: ['desktop'],
                },
                {
                    name: "volume up",
                    onPress: async () => {
                        session.sendAPICall({
                            tid,
                            call: "/volume/up",
                            action: {
                                name: "volume",
                                data: {
                                    action: "up",
                                },
                            },
                        });
                    },
                    icon: require("../icons/times.png"),
                    type: ['desktop'],
                },
                {
                    name: "volume down",
                    onPress: async () => {
                        session.sendAPICall({
                            tid,
                            call: "/volume/down",
                            action: {
                                name: "volume",
                                data: {
                                    action: "down",
                                },
                            },
                        });
                    },
                    icon: require("../icons/times.png"),
                    type: ['desktop'],
                },
            ]
        };
    }

    render() {
        return (
            <ScrollView style={styles.defaults.container}>
                {
                    this.state.actions.map((action, index) => (
                        <SettingsButton
                            key={index}
                            title={action.name}
                            img={action.icon}
                            onPress={action.onPress}/>
                    ))
                }
            </ScrollView>
        );
    }
}
