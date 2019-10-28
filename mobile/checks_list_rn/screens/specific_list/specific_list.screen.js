import React, { Component } from 'react';
import {
    Alert,
    // Platform,
      StyleSheet,
    //   Button,
    Text,
    View,
    //   Image,
    //   ProgressBarAndroid,
    FlatList,
    TouchableOpacity,
    Picker,
    TouchableWithoutFeedbackBase,
    ProgressBarAndroid
    // TouchableHighlight,
} from 'react-native';

// RN elements
import { Input, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';

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

// import component
import User_Data from "./components/user_data.component";

// last part of form
// 0: user data
// 1: quesitons
// 2: send button
const last_part = 2

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
                    // index of part of form
                    index: 0,
                    wait: false,
                };
                
                this.send_responses = this.send_responses.bind(this);
                this.change_answer = this.change_answer.bind(this);
                this.on_change_user_data = this.on_change_user_data.bind(this);
                this.render_switch = this.render_switch.bind(this);
                this.change_part = this.change_part.bind(this);
            }
            
            // send responses to server
            send_responses () {
                
                // waiting state
                this.setState({
                    wait: true,
                });
                
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
                            // chagen waiting state
                            this.setState({
                                wait: false,
                            });
                            // Works on both iOS and Android
                            Alert.alert(
                                'Lista enviada',
                                'Se han enviado correctamente tus respuestas',
                                [
                                    { text: 'Entendido', onPress: () => this.props.navigation.navigate("Choose_Check_List_Type")},
                                    // { text: 'Entendido', onPress: () => this.props.navigation.dispatch(resetAction)},
                                ],
                            { cancelable: false },
                            );
                            
                        })
                        .catch((error) => {
                            this.setState({
                                wait: false,
                            });
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
                
                // wait state
                this.setState({
                    wait: true,
                });
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
                this.setState({
                    wait: false,
                });
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
        console.log(this.props.navigation.state.params.list.user_data);
        // get length of questions
        const lenght_questions = this.props.navigation.state.params.list.questions.length;
        // array of store answers
        var answers = [];
        var user_data = [];
        // crate array of answers
        for (var i = 0; i < lenght_questions; i++) {
            // add automatic answers ("No aplica")
            answers.push("no_aplica");
        }
        // crate array of user data answers
        for (var i = 0; i < this.props.navigation.state.params.list.user_data.length; i++) {
            user_data.push("");
        }
        // update state
        this.setState({
            answers: answers,
            user_data: user_data,
        });

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

    // render parts of form
    render_switch (index) {
        switch (index) {
            // first part
            case 0:
                return (
                   <View>
                        <Text
                            style={{ marginTop: 20, marginBottom: 20, fontWeight: "bold", fontSize: 20 }}
                        >
                            Datos del trabajador
                        </Text>
                        <FlatList
                            data={this.props.navigation.state.params.list.user_data}
                            // extraData = {this.state.answers}
                            renderItem={
                                ({ item, index }) =>
                                    <View key = {index}>
                                        <Input
                                            label={item}
                                            onChangeText={text => this.on_change_user_data(text, index)}
                                            value={this.state.user_data[index]}
                                        // placeholder= {item}
                                        // leftIcon={{ type: 'font-awesome', name: 'chevron-left' }}
                                        />
                                    </View>
                            }
                            keyExtractor={(item, index) => { index.toString() }}
                        />
                   </View> 
                );
            
            // second part
            case 1:
                return (
                    <View>
                        <Text
                            style={{ marginTop: 20, marginBottom: 20, fontWeight: "bold", fontSize: 20 }}
                        >
                            Items a chequear
                        </Text>

                        <FlatList
                            style={styles.flat_list}
                            data={this.props.navigation.state.params.list.questions}
                            // extraData = {this.state.answers}
                            renderItem={
                                ({ item, index }) =>
                                    <View
                                        style = {styles.item_from_list}
                                        key = {index}
                                    >
                                        <Text
                                            style = {{
                                                textAlign: "center",
                                                fontSize: 20,
                                                margin: 5,
                                                marginBottom: 20,
                                                fontWeight: "bold"
                                            }}
                                        >
                                            {index + 1}
                                        </Text>
                                        <Text
                                            style = {styles.text_item}
                                        >
                                            {item}
                                        </Text>
                                        <Picker
                                            // style = {{paddingTop: 20}}
                                            selectedValue={this.state.answers[index]}
                                            style={{ color: "rgba(14, 20, 27, 0.6)", margin: 10, height: 50, width: "100%" }}
                                            onValueChange={(value) => this.change_answer(value, index)}>
                                            <Picker.Item label="Cumple" value="cumple" />
                                            <Picker.Item label="No cumple" value="no_cumple" />
                                            <Picker.Item label="No aplica" value="no_aplica" />
                                        </Picker>
                                    </View>
                            }
                            keyExtractor={(item, index) => { index.toString() }}
                        />
                    </View>
                );
            // 3 screen
            case 2:
                return (
                    <Button
                        title="Enviar mis respuestas"
                        onPress={this.send_responses}
                        buttonStyle = {styles.send_button}
                        icon={{
                            name: "paper-plane",
                            size: 15,
                            color: "white",
                            type: "font-awesome",
                            size: 30,
                            iconStyle: {margin: 20}
                        }}
                        // fontSize = {50}
                    />
                );
        }
    }

    // change part of form
    change_part (next_page) {
        // console.log(next_page)
        // update state
        // console.log(this.state.index);
        this.setState({
            index: next_page ? this.state.index + 1 : this.state.index - 1,
        })

    }

    // Render method
    render() {
        
        // return method
        return (

            <View
                style={{
                    // justifyContent: 'center',
                    // flexDirection: 'column',
                    // justifyContent: 'center',
                    // alignItems: 'center',
                    height: '100%',
                    // backgroundColor: "red"
                    // alignItems: 'center',
                }}
            >   
                {!this.state.wait
                
                ?

                    <View>
                    {this.render_switch(this.state.index)}

                    {this.state.index != last_part
                    
                    ?
                        <Button
                            iconRight = {true}
                            icon={{
                                name: "arrow-right",
                                color: "white",
                                type: "font-awesome",
                                size: 15,
                                iconStyle: { marginLeft: 20 }
                            }}
                            buttonStyle = {styles.next_button}
                            title="Siguiente"
                            onPress={()=>this.change_part(true)}
                        />
                    :
                        null
                    }

                    {this.state.index != 0
                    ?
                        <Button
                            icon={{
                                name: "arrow-left",
                                size: 15,
                                color: "white",
                                type: "font-awesome",
                                    iconStyle: { marginRight: 20 },
                            }}
                            buttonStyle={styles.next_button}
                            title="Anterior"
                            onPress={() => this.change_part(false)}
                        />
                    :
                        null
                    }

                    </View>
                :
                    <ProgressBarAndroid/>
                }

            </View>

        );

    }

}

const styles = StyleSheet.create({
    flat_list: {
        height: "65%",
        // paddingBottom: 50,
        // backgroundColor: "red"
    },
    item_from_list: {
        margin: 15,
        borderBottomWidth: 1,
        padding: 30,
        borderBottomColor: "rgba(14, 20, 27, 0.21)",
        // fontSize: 50,
    },
    text_item: {
        fontSize: 16,
        color: "rgba(14, 20, 27, 1)",
    },
    text: {
        fontSize: 25,
    },
    sub_text: {
        fontSize: 13,
    },
    button: {
        margin: 10,
        height: 50,
        padding: 35,
        // fontSize: 40,
        // width: "100%",
        // alignContent: "center",
        // justifyContent: "center"
        // backgroundColor: "red"
    },
    next_button: {
        margin: 10,
        // position: "relative",
        // bottom: 10,
        // right: 10
    },
    send_button: {
        margin: 50,
        // fontSize: 50,
        // fontWeight: "bold",
        // backgroundColor: "red",
        height: 80,
    }
})

export default withNavigation(Specific_List);