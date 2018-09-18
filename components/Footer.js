import React, {Component} from 'react';
import { View } from 'react-native';
import styles from '../style/styles.dark';

import FooterButton from './FooterButton';

export default class Footer extends Component {
    constructor(props) {
        super(props);
        this.setState = {
            index: 0,
        };
    }

    updateIndex = (index) => {
        this.setState({index});
    }

    render() {
        return (
            <View style={{height: 48}}>
                <View style={styles.footer}>
                    <FooterButton
                        title="Devices" />
                    <FooterButton
                        title="New" />
                    <FooterButton
                        title="Settings" />
                    <FooterButton
                        title="Logout" 
                        onPress={this.props.onLogout} />
                </View>
            </View>
        );
    }
}
// export default class Button extends Component {
//     state = {
//         index: 0,
//     };

//     updateIndex = (index) => {
//         this.setState({index});
//     }

//     render() {
//         const devices = () => <FooterButton
//             title="devices" />;
//         const settings = () => <FooterButton
//             title="settings" />;
//         const n = () => <FooterButton
//             title="new" />;

//         const buttons = [
//             { element: devices }, 
//             { element: n }, 
//             { element: settings }
//         ];
//         return (
//             <ButtonGroup
//             style={styles.footer}
//             onPress={this.updateIndex}
//             selectedIndex={this.state.index}
//             buttons={buttons}
//             containerStyle={{height: 30}} />
//         );
//     }
// }
