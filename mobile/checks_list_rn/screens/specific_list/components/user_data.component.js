import React, { Component } from 'react';
import {
    Alert,
    // Platform,
    //   StyleSheet,
    Button,
    Text,
    View,
    //   Image,
    //   ProgressBarAndroid,
    FlatList,
    TouchableOpacity,
    Picker
    // TouchableHighlight,
} from 'react-native';

// RN elements
import { Input } from 'react-native-elements'
import { withNavigation } from 'react-navigation';

class User_Data extends Component {

    // componentDidMount () {
    //     console.log(this.props.user_data);
    // }
    // Render method
    render() {

        // return method
        return (

            <View>
                <Text>
                    Datos del trabajador
                </Text>
                <FlatList
                    data={this.props.user_data}
                    // extraData = {this.state.answers}
                    renderItem={
                        ({ item, index }) =>
                            <View>
                                <Input
                                    label={item}
                                    onChangeText={text => this.props.on_change_user_data(text, index)}
                                    // onChangeText = {console.log("oaijd")}
                                    value={this.props.user_data[index]}
                                // placeholder= {item}
                                // leftIcon={{ type: 'font-awesome', name: 'chevron-left' }}
                                />
                            </View>
                    }
                    keyExtractor={(item, index) => { index.toString() }}
                />
            </View>

        );

    }

}

export default withNavigation(User_Data);