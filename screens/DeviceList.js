import React, {Component} from 'react';
import { RefreshControl } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SearchBar } from 'react-native-elements';

export default class DeviceList extends Component {
    state = {
        refreshing: false,
        query: ""
    }

    _onRefresh = () => {
        this.setState({refreshing: true});
        setTimeout(() => {
            this.setState({refreshing: false});
        }, 500);
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
                        onRefresh={this._onRefresh}
                    />
                }>
            <SearchBar
                round
                searchIcon={{ size: 24 }}    
                clearIcon
                onChangeText={this.handleSearchChange}
                onClear={this.handleSearchClear}
                value={this.state.query}
                placeholder='Type Here...'/>
            </ScrollView>
        );
    }
}
