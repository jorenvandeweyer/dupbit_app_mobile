import React, {Component} from 'react';
import { RefreshControl, View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SearchBar } from 'react-native-elements';
import * as styles from '../style/styles.dark';

import Cog from '../components/Cog';
import BackArrow from '../components/BackArrow';
import Device from '../components/Device';

export default class DeviceList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            query: "",
            devices: [],
            screen: "list",
            device_id: 0,
        };
        this.session = this.props.parent.session;
        this.list();
    }

    list = async () => {
        const devices = await this.session.list();
        if (devices && devices.success && devices.sockets) {
            this.setState({devices: devices.sockets});
        }
    }

    openDevice = async (id) => {
        this.setState({
            device_id: id,
            screen: "device",
        });
        this.props.parent.setState({statusBarHolder: false});
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

    back = () => {
        if (this.state.screen === "device") {
            this.props.parent.setState({statusBarHolder: true});
            this.setState({screen: "list"});
        } else if (this.state.screen === "settings") {
            this.setState({screen:"device"});
        } else {
            this.props.parent.setState({statusBarHolder: true});
            this.setState({screen: "list"});
        }
    }

    render() {
        if (this.state.screen === "device") {
            return (            
                <View
                    style={styles.defaults.container}>
                    <View style={[styles.device.header, styles.defaults.row]}>
                        <BackArrow
                            onPress={this.back}/>

                        <Text style={styles.device.headerTitle}>TITLE</Text>
                        <Cog/>
                    </View>
                    <Text>TEST</Text>
                </View>
            );
        } else if (this.state.screen === "list") {
            return (
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
            );
        }

    }
}
