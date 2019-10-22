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
            checked: false,
        };

        this.send_responses = this.send_responses.bind(this);
        this.change_answer = this.change_answer.bind(this);
    }

    // send responses to server
    send_responses () {
        console.log("send response");
        // create list to send
        const list = {
            id_list: this.props.navigation.state.params.list.id,
            name_list: this.props.navigation.state.params.list.name,
            anwers: this.state.answers,
        }

        // send responses to server
        // Add a new document with a generated id.
        fs.collection("env_lists_responses").add(list)
            .then((docRef) => {
                console.log("Document written with ID: ", docRef.id);

                // Alert message
                // Works on both iOS and Android
                Alert.alert(
                    'Lista enviada',
                    'Se han enviado correctamente tus respuestas',
                    [
                        { text: 'Entendido', onPress: () => this.props.navigation.navigate("Home")},
                    ],
                    { cancelable: false },
                );
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
                // Alert message
                // Works on both iOS and Android
                Alert.alert(
                    'Error',
                    'Ha ocurrido un error, porfavor intentálo de nuevo',
                    [
                        { text: 'Lo intentaré de nuevo', onPress: () => console.log("Try to send again") },
                    ],
                    { cancelable: false },
                );
            });

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
                            answers.push(false);
                        });

                        // update state
                        this.setState({

                            questions: questions,
                            answers: answers,
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
    
    // change answer
    change_answer (index) {
        // update anwers
        let anwers = this.state.answers;
        // console.log(anwers[index]);
        anwers[index] = !anwers[index];
        // console.log(anwers[index]);
        // update anwers state
        this.setState({
            answers: anwers,
        })
    }

    // Render method
    render() {

        // return method
        return (

            <View>
                <FlatList
                    data={this.state.questions}
                    renderItem={
                        ({ item, index }) =>
                            <TouchableOpacity onPress={() => Alert.alert("click")}>
                                <Text>
                                    {item.question}
                                </Text>
                                <CheckBox
                                    title='Aplica'
                                    checked={this.state.answers[index]}
                                    onPress={() => this.change_answer(index)}
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