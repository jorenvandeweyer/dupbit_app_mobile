import React, {Component} from 'react';
import {Text, View, StatusBar} from 'react-native';
import DeviceList from './screens/DeviceList';
import LoginScreen from './screens/LoginScreen';

import Session from './src/session';



export default class ModalExample extends Component {
    state = {
        screen: "login",
    };

    // setModalVisible(visible) {
    //     this.setState({modalVisible: visible});
    // }

    login(username, password) {
        console.log("login succeed", username, password);
        Session.login(username, password).then(console.log);
    }

    render() {
        if (this.state.screen === "login") {
            return (
                <LoginScreen
                onLogin={this.login}/>
            );
        } else {
            return (
                <View style={{flex: 1}}>
                    <StatusBar barStyle="light-content"/>
                    <DeviceList/>
                    <View><Text>footer</Text></View>
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
