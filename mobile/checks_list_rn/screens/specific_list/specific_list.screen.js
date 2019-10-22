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
    TouchableOpacity
    // TouchableHighlight,
} from 'react-native';

// RN elements
import { CheckBox } from 'react-native-elements'

import { withNavigation } from 'react-navigation';

// import firestore
import { fs } from "../../src/firebase";

// check net conecction
import NetInfo from "@react-native-community/netinfo";

class Specific_List extends Component {

    // Options for header bar
    static navigationOptions = ({ navigation }) => {

        return {
            title: navigation.state.params.list.name,
            //   headerLeft: null,
            // headerLeft: <Image 
            //       source={require('../assets/images/JEYBLANCO.png')} 
            //       style = {{width: 50, height: 50}}
            //     />,
            // headerStyle: {
            //   backgroundColor: "#9669AA",
            //   fontWeight: 20,
            // },
            headerTintColor: 'black',
            //   headerTitleStyle: {
            //     fontSize: 30,
            //     fontFamily: "Lobster-Regular"
            //   },

        };
    };

    //Constructor
    constructor(props) {

        super(props);

        // set states
        this.state = {

            // list of questions
            questions: [],
            // list of answers
            answers: [],
        };

        this.send_responses = this.send_responses.bind(this);

    }

    // send responses to server
    send_responses () {
        console.log("send response");
    }

    componentDidMount() {

        // check internet connection
        NetInfo.fetch().then(state => {

            // if it is connected
            if (state.isConnected) {

                // query to firestore
                fs.collection(this.props.navigation.state.params.category).doc(this.props.navigation.state.params.list.id).collection('questions').get().then(snapshotquery => {

                    // if query is not empty
                    if (!snapshotquery.empty) {

                        // array for store questions
                        let questions = [];
                        let answers = [];

                        // iterate over each item
                        snapshotquery.forEach(doc => {
                            // add item to array
                            questions.push(doc.data());
                            // add automatic answers (False: 0)
                            answers.push(0);
                        });

                        // update state
                        this.setState({

                            questions: questions,

                        });

                    }

                    // if query is empty
                    else {

                        // doc.data() will be undefined in this case
                        console.log("No such document!");

                    }

                });

            }

            // it isn't connected to internet
            else {

                // Message to user
                Alert.alert(
                    'Ups, tenemos problemas con la conexión a Internet',
                    'Necesitamos conectarnos a Internet y al parecer no tienes conexión',
                    [
                        { text: 'Me conectaré' },
                    ],
                    { cancelable: false },
                )

            };

        });

    }

    // Render method
    render() {

        // return method
        return (

            <View>
                <FlatList
                    data={this.state.questions}
                    renderItem={
                        ({ item }) =>
                            <TouchableOpacity onPress={() => Alert.alert("click")}>
                                <Text>
                                    {item.question}
                                </Text>
                                <CheckBox
                                    title='Aplica'
                                    checked={0}
                                />
                                <CheckBox
                                    title='No aplica'
                                    checked={0}
                                />
                            </TouchableOpacity>
                    }
                />

                <Button
                    title="Enviar mis respuestas"
                    //   color="#f194ff"
                    onPress={this.send_responses}
                />

            </View>

        );

    }

}

export default withNavigation(Specific_List);