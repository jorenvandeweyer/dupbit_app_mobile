import React, {Component} from 'react';
import { RefreshControl, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SearchBar } from 'react-native-elements';
import styles from '../style/styles.dark';

import Device from '../components/Device';

export default class DeviceList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            query: "",
            devices: [],
        };
    }

    _onRefresh = async () => {
        this.setState({refreshing: true});
        const devices = await this.props.parent.session.list();
        if (devices && devices.success) {
            this.setState({devices: devices.sockets});
            console.log(devices.sockets);
        }
        this.setState({
            refreshing: false,
        });
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
                style={styles.container}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh}
                    />
                }>
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
