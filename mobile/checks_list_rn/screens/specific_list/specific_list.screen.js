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

// import firestore
// import { fs } from "../../src/firebase";
import firestore from '@react-native-firebase/firestore';

// realm local database
import Realm from 'realm';
// import models of local DB
import { List, List_Answers } from "../../models/models";

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

            // list of answers
            answers: [],
            user_data: [],
        };

        this.send_responses = this.send_responses.bind(this);
        this.change_answer = this.change_answer.bind(this);
        this.on_change_user_data = this.on_change_user_data.bind(this);
    }

    // send responses to server
    send_responses () {

        console.log("answers: ", this.state.answers);
        // console.log("send response new implemenation!");
        // create list to send
        const list = {
            id_list: this.props.navigation.state.params.list.id,
            name_list: this.props.navigation.state.params.list.name,
            user_data: this.state.user_data,
            answers: this.state.answers,
            type: this.props.navigation.state.params.category,
        }

        console.log(this.state.answers);

        // check internet connection
        NetInfo.fetch().then(state => {
            
            // if it is connected
            if (state.isConnected) {
                console.log("Internet connection detected. Send anwers to server");
                // send responses to server
                // Add a new document with a generated id.
                // fs.collection("env_lists_responses").add(list)
                // firestore().collection("env_lists_responses").add(list)
                firestore().collection("answers").add(list)
                    .then((docRef) => {
                        console.log("Document written in server with ID: ", docRef.id);
                        // Works on both iOS and Android
                        Alert.alert(
                            'Lista enviada',
                            'Se han enviado correctamente tus respuestas',
                            [
                                { text: 'Entendido', onPress: () => this.props.navigation.navigate("Choose_Check_List_Type")},
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
        
            // if there is not internet connection
            else {
        
                console.log("Whitout internet connection. Storing answer in local DB");
                
                // store in local DB
                // const realm = Realm.getDefaultInstance()

                // console.log(Realm.default.getInstance(this.context));
                // local DB isntance

                // const realm = new Realm({ schema: [Env_List_Answers] });
                // const realm = new Realm({ schema: [Env_List, SSO_List, Env_List_Answers] });
                // const realm = new Realm({ schema: [Env_List, SSO_List, Env_List_Answers, SSO_List_Answers] });
                const realm = new Realm({ schema: [List, List_Answers] });
                
                // try to store in DB
                // try {
                // write in db
                realm.write(() => {
                    // realm.create("Env_List_Answers", list);
                    realm.create("List_Answers", list);
                });

                console.log("Lists answers after store new answer: ", realm.objects("List_Answers"));
                // Works on both iOS and Android
                Alert.alert(
                    'Respuestas por enviar',
                    'Al parecer no tienes conexión a internet, por que las respuestas se almacenarán en tu dispositivo, y se enviarán automaticamente cuando se detecte conexión a internet',
                    [
                        { text: 'Entendido', onPress: () => this.props.navigation.navigate("Choose_Check_List_Type") },
                    ],
                    { cancelable: false },
                );
                // }
                // catch () {
                //     console.log("Error");

                // }
                // finally {
                    // close local BD
                    // console.log("Closing local DB");
                    // realm.close();
                // }

        
            }
                
        });
            
    }
        
    componentDidMount() {
            
            // get length of questions
        const lenght_questions = this.props.navigation.state.params.list.questions.length;
        // array of store answers
        var answers = [];
        var user_data = [];
        // crate array of answers
        for (var i = 0; i < lenght_questions; i++) {
            // add automatic answers ("No aplica")
            answers.push("no_aplica");
            user_data.push("");
        }

        // update state
        this.setState({
            answers: answers,
            user_data: user_data,
        });

        // // check internet connection
        // NetInfo.fetch().then(state => {

        //     // if it is connected
        //     if (state.isConnected) {

        //         // query to firestore
        //         // fs.collection(this.props.navigation.state.params.category).doc(this.props.navigation.state.params.list.id).collection('questions').get().then(snapshotquery => {
        //         // firestore().collection(this.props.navigation.state.params.category).doc(this.props.navigation.state.params.list.id).collection('questions').get().then(snapshotquery => {
        //         firestore().collection(this.props.navigation.state.params.category).doc(this.props.navigation.state.params.list.id).collection('questions').onSnapshot(snapshotquery => {
                
        //             // console.log("new implementation!");
                    
        //             // if query is naot empty
        //             if (!snapshotquery.empty) {

        //                 // array for store questions
        //                 let questions = [];
        //                 let answers = [];

        //                 // iterate over each item
        //                 snapshotquery.forEach(doc => {
        //                     // add item to array
        //                     questions.push(doc.data());
        //                     // add automatic answers (False: 0)
        //                     answers.push(false);
        //                 });

        //                 // update state
        //                 this.setState({

        //                     questions: questions,
        //                     answers: answers,
        //                 });

        //             }

        //             // if query is empty
        //             else {

        //                 // doc.data() will be undefined in this case
        //                 console.log("No such document!");

        //             }

        //         });

        //     }

        //     // it isn't connected to internet
        //     else {

        //         // Message to user
        //         Alert.alert(
        //             'Ups, tenemos problemas con la conexión a Internet',
        //             'Necesitamos conectarnos a Internet y al parecer no tienes conexión',
        //             [
        //                 { text: 'Me conectaré' },
        //             ],
        //             { cancelable: false },
        //         )

        //     };

        // });

    }
    
    on_change_user_data (value, index) {
        let user_data = this.state.user_data;
        user_data[index] = value;
        console.log(user_data);
        this.setState({
            user_data: user_data,
        })
    }

    // change answer
    change_answer (value, index) {

        console.log(value, index);
        // get anwers
        let answers = this.state.answers;
        // update answer
        answers[index] = value;
        // update state
        this.setState({
            answers: answers,
        });
    }

    // Render method
    render() {

        // return method
        return (

            <View>
                <Text>
                    Datos del trabajador
                </Text>
                <FlatList
                    data={this.props.navigation.state.params.list.user_data}
                    // extraData = {this.state.answers}
                    renderItem={
                        ({ item, index }) =>
                            <View>
                                <Input
                                    label = {item}
                                    onChangeText={text => this.on_change_user_data(text, index)}
                                    value={this.state.user_data[index]}
                                    // placeholder= {item}
                                    // leftIcon={{ type: 'font-awesome', name: 'chevron-left' }}
                                />
                            </View>
                    }
                    keyExtractor={(item, index) => { index.toString() }}
                />
                <Text>
                    Items a chequear
                </Text>
                <FlatList
                    data={this.props.navigation.state.params.list.questions}
                    // extraData = {this.state.answers}
                    renderItem={
                        ({ item, index }) =>
                            <TouchableOpacity>
                                <Text>
                                    {item}
                                </Text>
                                <Picker
                                    selectedValue={this.state.answers[index]}
                                    style={{ height: 50, width: "100%" }}
                                    onValueChange={(value) => this.change_answer(value, index)}>
                                    <Picker.Item label="Cumple" value="cumple" />
                                    <Picker.Item label="No cumple" value="no_cumple" />
                                    <Picker.Item label="No aplica" value="no_aplica" />
                                </Picker>
                            </TouchableOpacity>
                    }
                    keyExtractor={(item, index) => {index.toString()}}
                />

                <Button
                    title="Enviar mis respuestas"
                    onPress={this.send_responses}
                />

            </View>

        );

    }

}

export default withNavigation(Specific_List);