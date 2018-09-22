import React, {Component} from 'react';
import {AsyncStorage, Image} from 'react-native';
import { createStackNavigator, createSwitchNavigator, createBottomTabNavigator } from 'react-navigation';

import Navigator from './src/Navigator';

import DeviceList from './screens/DeviceList';
import Device from './screens/Device';
import DeviceSettings from './screens/DeviceSettings';

import KeysScreen from './screens/KeysScreen';
import SettingsScreen from './screens/SettingsScreen';
import LoginScreen from './screens/LoginScreen';
import LoadingScreen from './screens/LoadingScreen';

import Session from './src/session';

let session;

const sessionOptions = {
    host: "dupbit.com",
    socket: false,
};

async function connect() {
    const token = await AsyncStorage.getItem('token');
    if (token) {
        session = new Session({
            ...sessionOptions,
            token,
        });

        Navigator.setSession(session);

        session.on("error", async (msg) => {
            if (msg === "invalid token") {
                await AsyncStorage.removeItem('token');
                Navigator.navigate("Login");
            }

        });

        session.on("ready", () => {
            Navigator.navigate("List");
        });
    } else {
        Navigator.navigate("Login");
    }
}

async function login(token) {
    Navigator.navigate("Loading");
    await AsyncStorage.setItem('token', token);
    connect();
}

async function logout() {
    await AsyncStorage.removeItem('token');
    Navigator.navigate("Login");
}

const DevicesStack = createStackNavigator(
    {
        List: DeviceList,
        Device: Device,
        DeviceSettings: DeviceSettings,
    },
    {
        initialRouteName: "List",
        navigationOptions: {
            headerStyle: {
                backgroundColor: "#2B2D31",
                borderBottomColor: "#252525",
            },
            headerTitleStyle: {
                fontSize: 20,
                fontWeight: 'bold',
                color: '#53575C',
            },
            headerTintColor: '#53575C',
        },
    },
);

const SettingsStack = createStackNavigator(
    {
        Settings: SettingsScreen,
    },
    {
        initialRouteName: "Settings",
        navigationOptions: {
            headerStyle: {
                backgroundColor: "#2B2D31",
                borderBottomColor: "#252525",
            },
            headerTitleStyle: {
                fontSize: 20,
                fontWeight: 'bold',
                color: '#53575C',
            },
            headerTintColor: '#53575C',
        },
    }
)

const AppTab = createBottomTabNavigator(
    {
        Devices: {
            screen: DevicesStack,
        },
        Keys: {
            screen: KeysScreen,
        },
        Settings: {
            screen: SettingsStack,
        },
    },
    {
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => {
                const { routeName } = navigation.state;
                if (routeName === 'Devices') {
                    return <Image 
                        source={require("./icons/devices_bordered.png")}/>;
                } else if (routeName === 'Keys') {
                    return <Image 
                        source={require("./icons/key_bordered.png")}/>;
                } else if (routeName === 'Settings') {
                    return <Image 
                        source={require("./icons/bars_bordered.png")}/>
                }
            },
        }),
        tabBarOptions: {
            activeBackgroundColor: "#222121",
            inactiveBackgroundColor: "#2B2D31",
            showLabel: false,
            style: {
                backgroundColor: "#2B2D31",
            },
            tabStyle: {
                borderRadius: 5,
            },
        }
    }
)

const AuthStack = createStackNavigator(
    {
        Login: LoginScreen,
    },
    {
        navigationOptions: {
            header: null,
        }
    }
);

const Root = createSwitchNavigator(
    {
        Loading: LoadingScreen,
        Auth: AuthStack,
        App: AppTab,
    },
    {
        initialRouteName: 'Loading',
    }
);

export default class App extends Component {
    componentDidMount = async () => {
        connect();
    }

    render() {
        return (<Root
            ref={(nav) => Navigator.setNavigator(nav)}
            screenProps={{login, logout}}/>);
    }
}
