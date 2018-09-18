import React, {Component} from 'react';
import {View, AsyncStorage} from 'react-native';
import DeviceList from './screens/DeviceList';
import LoginScreen from './screens/LoginScreen';
import LoadingScreen from './screens/LoadingScreen';
import Footer from './components/Footer';

import Session from './src/session';
import styles from './style/styles.dark';

const sessionOptions = {
    host: "dupbit.com",
    socket: false,
};

export default class ModalExample extends Component {
    constructor(props) {
        super(props);
        this.state = {
            screen: "loading",
            token: ""
        };
        this.session = "";
    }


    // setModalVisible(visible) {
    //     this.setState({modalVisible: visible});
    // }

    async componentDidMount() {
        this.connect();
    }

    connect = async () => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            this.session = new Session({
                ...sessionOptions,
                token,
            });
            this.session.on("error", async (msg) => {
                if (msg === "invalid token") {
                    await AsyncStorage.removeItem('token');
                    this.setState({screen: "login"});
                }
            });
            this.session.on("ready", () => {
                this.setState({token, screen:"devices"});
            });
        } else {
            this.setState({screen: "login"});
        }
    }

    login = async (token) => {
        this.setState({ screen:"loading" });
        await AsyncStorage.setItem('token', token);
        this.connect();
    }

    logout = async () => {
        await AsyncStorage.removeItem('token');
        this.setState({
            token: "",
            screen: "login",
        });
    }

    changeScreen = (screen) => {
        this.setState({screen});
    }

    render() {
        if (this.state.screen === "loading") {
            return (
                <LoadingScreen/>
            );
        } else if (this.state.screen === "login") {
            return (
                <LoginScreen
                onSuccess={this.login}/>
            );
        } else {
            let Screen;
            if (this.state.screen === "devices") Screen = DeviceList;
            return (
                <View style={styles.container}>
                    <View style={styles.statusBarHolder} />
                    <Screen parent={this}/>
                    <Footer 
                        onLogout={this.logout}
                        OnChangeScreen={this.changeScreen} />
                </View>
            );
        }
    }
}
    // render() {
    //     return (
    //     <View height="100%">
    //         {/* <Modal
    //             animationType="fade"
    //             transparent={true}
    //             visible={this.state.modalVisible}
    //             onRequestClose={() => {
    //                 Alert.alert('Modal has been closed.');
    //             }}>
    //             <View style={{marginTop: 22}}>
    //                 <View>
    //                     <Text>Hello World!</Text>

    //                     <TouchableHighlight
    //                         onPress={() => {
    //                             this.setModalVisible(!this.state.modalVisible);
    //                         }}>
    //                         <Text>Hide Modal</Text>
    //                     </TouchableHighlight>
    //                 </View>
    //             </View>
    //         </Modal>

    //         <TouchableHighlight
    //             onPress={() => {
    //                 this.setModalVisible(true);
    //             }}>
    //             <Text>Show Modal</Text>
    //         </TouchableHighlight> */}
    //     </View>
    // );
//   }
