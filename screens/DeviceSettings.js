import React, {Component} from 'react';
import { RefreshControl, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SearchBar } from 'react-native-elements';
import * as styles from '../style/styles.dark';

import Device from '../components/Device';

export default class DeviceSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            query: "",
            devices: [],
        };
        this.session = this.props.parent.session;
        this.list();
    }

    list = async () => {
        this.setState({refreshing: true});
        const devices = await this.session.list();
        console.log(devices);
        if (devices && devices.success) {
            this.setState({devices: devices.data});
        }
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
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this.list()}/> 
                }
                style={styles.container}>
                <SearchBar
                    containerStyle={styles.searchBar}
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
                            key={device.id}/>
                    ))
                }
            </ScrollView>
        );
    }
}
