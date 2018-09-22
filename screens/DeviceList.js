import React, {Component} from 'react';
import { RefreshControl, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SearchBar } from 'react-native-elements';
import * as styles from '../style/styles.dark';

import Navigator from '../src/Navigator';

import Device from '../components/Device';

export default class DeviceList extends Component {
    static navigationOptions =  {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            query: "",
            devices: [],
        };
        this.session = Navigator.getSession();
        Navigator.setControl('refreshDevices', this.list);
        this.list();
    }

    list = async () => {
        const devices = await this.session.list();
        if (devices && devices.success && devices.sockets) {
            this.setState({devices: devices.sockets});
        }
    }

    openDevice = async (device) => {
        Navigator.navigate("Device", device);
    }

    _onRefresh = async () => {
        this.setState({refreshing: true});
        await this.list();
        this.setState({refreshing: false});
    }

    handleSearchClear = () => {
        this.setState({query: ""});
    }

    handleSearchChange = (query) => {
        console.log(query);
        this.setState({ query });
    }

    render() {
        return (
            <View style={styles.defaults.container}>
                <View style={styles.defaults.statusBarHolder}/>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}/> 
                    }
                    style={styles.defaults.container}>
                    <SearchBar
                        containerStyle={styles.defaults.searchBar}
                        round
                        searchIcon={{ size: 24 }}    
                        clearIcon
                        onChangeText={this.handleSearchChange}
                        onClear={this.handleSearchClear}
                        value={this.state.query}
                        placeholder='Type Here...'/>
                    { 
                        this.state.devices.map((device) => (
                            <Device 
                                data={device}
                                key={device.id}
                                onPress={this.openDevice}/>
                        ))
                    }
                </ScrollView>
            </View>
        );
    }
}
