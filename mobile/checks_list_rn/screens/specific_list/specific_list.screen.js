console.disableYellowBox = true; 

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
    // TouchableWithoutFeedbackBase,
    ProgressBarAndroid
    // TouchableHighlight,
} from 'react-native';

// RN elements
import { Input, Button } from 'react-native-elements'
// import Icon from 'react-native-vector-icons/FontAwesome';

// user signature
import SignatureCapture from 'react-native-signature-capture';
// store a file
import RNFS from "react-native-fs";
// var RNFS = require('react-native-fs');
import { withNavigation } from 'react-navigation';

// import firestore
// import { fs } from "../../src/firebase";
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

// realm local database
import Realm from 'realm';
// import models of local DB
import { List, List_Answers } from "../../models/models";

// check net conecction
import NetInfo from "@react-native-community/netinfo";

// import component
// import User_Data from "./components/user_data.component";


// last part of form
// 0: user data
// 1: questions
// 2: user signature
// 3: send button
const last_part = 3

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
                    // answers observations
                    answers_observations: [],
                    user_data: [],
                    // index of part of form
                    index: 0,
                    wait: false,
                    // wait until sign is stored
                    wait_store_signature: false,
                    // sigature (image)
                    signature: null,
                };
                
                this.send_responses = this.send_responses.bind(this);
                this.change_answer = this.change_answer.bind(this);
                this.on_change_user_data = this.on_change_user_data.bind(this);
                this.render_switch = this.render_switch.bind(this);
                this.change_part = this.change_part.bind(this);
                this._onSaveEvent = this._onSaveEvent.bind(this);

            }
            
            // send responses to server
            send_responses () {
                
                // validate information is not empty
                if (this.state.signature != null) {
                    
                    // check internet connection
                    NetInfo.fetch().then(state => {
                        
                        console.log("netInfo analysis");
                        
                        // set file name
                        const file_name = this.props.navigation.state.params.list.name + "_" + Date.now();

                        // create list to send
                        const list = {
                            id_list: this.props.navigation.state.params.list.id,
                            name_list: this.props.navigation.state.params.list.name,
                            user_data: this.state.user_data,
                            answers: this.state.answers,
                            answers_observations: this.state.answers_observations,
                            type: this.props.navigation.state.params.category,
                            // signature_img: downloadURL,
                            signature_img_file_name: file_name,
                        }
                        

                        // if it is connected
                        if (state.isConnected) {
                            
                            console.log("Internet connection detected. Send anwers to server");

                            // console.log("answers: ", this.state.answers);
                            // console.log("send response new implemenation!");

                            // upadte state to wait
                            this.setState({
                                wait: true,
                            });
                            
                            // console.log(file_name);
                            
                            var storageRef = storage().ref('signatures/' + file_name);

                            // store file in firebase store
                            storageRef.putString(this.state.signature, 'base64').then(snapshot => {

                                // return urldownload
                                return storageRef.getDownloadURL();

                            })
                            // if it's ok
                            .then(downloadURL => {

                                console.log(`Successfully uploaded file and got download link - ${downloadURL}`);
                            
                                // // create list to send
                                // const list = {
                                //     id_list: this.props.navigation.state.params.list.id,
                                //     name_list: this.props.navigation.state.params.list.name,
                                //     user_data: this.state.user_data,
                                //     answers: this.state.answers,
                                //     answers_observations: this.state.answers_observations,
                                //     type: this.props.navigation.state.params.category,
                                //     signature_img: downloadURL,
                                // }
                                // add link to signature
                                list["signature_img"] = downloadURL;
                                
                                
                                console.log("list object to send: ", list);
                                // add date
                                list["creation_date"] = firestore.Timestamp.now();
                                
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
        

                            })
                        }
                
                        // if there is not internet connection
                        else {
                    
                            console.log("Whitout internet connection. Storing answer in local DB");
                            
                            // wait state
                            this.setState({
                                wait: true,
                            });

                            // store image in device
                            // var path = RNFS.DocumentDirectoryPath + '/test.png';
                            var path = RNFS.DocumentDirectoryPath + "/" + file_name;

                            // add local file of signature as signature img
                            list["signature_img"] = path;
                            
                            // add date
                            list["creation_date"] = firestore.Timestamp.now().toDate();

                            console.log("path file: ", path);

                            // write the file
                            RNFS.writeFile(path, this.state.signature, 'base64')

                                .then((success) => {

                                    console.log('FILE WRITTEN!');

                                    // store in local DB
                                    const realm = new Realm({ schema: [List, List_Answers] });
                                    
                                    // write in db
                                    realm.write(() => {
                                        // realm.create("Env_List_Answers", list);
                                        realm.create("List_Answers", list);
                                    });

                                    // console.log("Lists answers after store new answer: ", realm.objects("List_Answers"));
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
                                })
                                .catch((err) => {
                                    console.log(err.message);
                                    // Alert to try it again
                                    // Works on both iOS and Android
                                    Alert.alert(
                                        'Error al intentar guardar la firma',
                                        'Hemos tenido un error al intentar almacenar la imagen de la firma en el dispositivo. Intentalo nuevamente por favor.',
                                        [
                                            { text: 'Entendido', onPress: () => this.setState({wait: false})},
                                        ],
                                        { cancelable: false },
                                    ); 
                                });
            
                            }
                    
                        });
                }

                // if there is not signature
                else {
                    // Works on both iOS and Android
                    Alert.alert(
                        'Falta información',
                        'Al parecer no has ingresado o confirmado tu firma. Debes hacerlo para poder enviar la lista.',
                        [
                            { text: 'Entendido'},
                            // { text: 'Entendido', onPress: () => this.props.navigation.dispatch(resetAction)},
                        ],
                        { cancelable: false },
                    );
                }
            
    }
        
    componentDidMount() {
        console.log(this.props.navigation.state.params.list.user_data);
        // get length of questions
        const lenght_questions = this.props.navigation.state.params.list.questions.length;
        // array of store answers
        var answers = [];
        var user_data = [];
        var answers_observations = [];
        // crate array of answers
        for (var i = 0; i < lenght_questions; i++) {
            // add automatic answers ("No aplica")
            answers.push("no_aplica");
            answers_observations.push("");
        }
        // crate array of user data answers
        for (var i = 0; i < this.props.navigation.state.params.list.user_data.length; i++) {
            user_data.push("");
        }
        // update state
        this.setState({
            answers: answers,
            user_data: user_data,
            answers_observations: answers_observations,
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

    // change osbervation of each question
    on_change_observation (value, index) {

        // console.log(value, index);
        // get anwers
        let answers_observations = this.state.answers_observations;
        console.log(answers_observations);
        // update answer
        answers_observations[index] = value;
        // update state
        this.setState({
            answers_observations: answers_observations,
        });

    }
    
    // save signature
    saveSign() {
        
        console.log("trying save sign function");

        try {
            // save signature
            this.refs["sign"].saveImage();
        }
        catch {
            console.log("Error storing sign image");
        }
        finally {
            console.log("sign stored");
            // update wait for store image state
            this.setState({
                wait_store_signature: true,
            })
        }
    }

    // reset signature canvas
    resetSign() {
        console.log("reset sign");
        this.refs["sign"].resetImage();
    }

    // event for save image of signature
    _onSaveEvent(result) {
        console.log("On save event");
        //result.encoded - for the base64 encoded png
        //result.pathName - for the file path name
        console.log("sign stored in: ", result.pathName);

        // update wait for store image state
        this.setState({
            wait_store_signature: false,
            signature: result.encoded,
        })
    }

    // render parts of form
    render_switch (index) {
        switch (index) {
            // first part
            case 0:
                return (
                   <View>
                        <Text
                            style={styles.text_title}
                        >
                            Datos del trabajador
                        </Text>

                        <Text>
                            Los campos con (*) son obligatorios
                        </Text>

                        <FlatList
                            style={styles.flat_list}
                            data={this.props.navigation.state.params.list.user_data}
                            // extraData = {this.state.answers}
                            renderItem={
                                ({ item, index }) =>
                                    <View key = {index}>
                                        <Input
                                            // focus = {true}
                                            label={index != (this.state.user_data.length - 1) ? item + " (*)": item}
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
                            style={styles.text_title}
                        >
                            Items a chequear
                        </Text>

                        <FlatList
                            initialNumToRender={this.props.navigation.state.params.list.questions.length}
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
                                        <Input
                                            // label= "Observación"
                                            onChangeText={text => this.on_change_observation(text, index)}
                                            value = {this.state.answers_observations[index]}
                                            placeholder= "Observación (opcional)"
                                        // leftIcon={{ type: 'font-awesome', name: 'chevron-left' }}
                                        />
                                    </View>
                            }
                            keyExtractor={(item, index) => { index.toString() }}
                        />
                    </View>
                );
            // user signature
            case 2:
                return (
                    <View
                    // style = {{
                        //     // backgroundColor: "red",
                        //     height: "80%",
                        //     // borderColor: "red",
                        //     // borderWidth: 1
                        // }}
                        >

                        <Text style={styles.text_title}>
                            Agrega tu firma
                        </Text>
                        <Text style = {[styles.text, {fontSize: 13, margin: 10}]}>
                            Debes confirmar la firma antes de continuar, o si no no se guardará
                        </Text>
                        <View
                            style = {{
                                flex: 1,
                                flexDirection: "row",
                                justifyContent: "center",
                                margin: 15,
                            }}
                        >
                            <Button
                                title="Reiniciar firma"
                                onPress={()=>this.resetSign()}
                                buttonStyle = {styles.signature_buttons}
                            />
                            <Button
                                title="Confirmar firma"
                                onPress={() => this.saveSign()}
                                buttonStyle = {[styles.signature_buttons, {backgroundColor: "green"}]}
                            />
                        </View>
                        <View
                            style = {{
                                borderWidth: 1,
                                borderColor: "gray",
                                height: "60%",
                                margin: 5,
                                // backgroundColor: "red"
                            }}                            
                        >
                            <SignatureCapture
                                style={[{ flex: 1 }, styles.signature]}
                                ref="sign"
                                onSaveEvent={this._onSaveEvent}
                                // onDragEvent={this._onDragEvent}
                                saveImageFileInExtStorage={false}
                                showNativeButtons={false}
                                showTitleLabel={false}
                                viewMode={"portrait"} 
                            />
                            
                        </View>
                    </View>
                )
                
            // 3 screen
            case 3:
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
    // this function will change the part of the form to press next or previuos button
    change_part (next_page) {

        // if page is form for fill user data
        if (this.state.index == 0) {
            
            // validate if all fields of user data are filled
            if(!this.state.user_data.slice(0, this.state.user_data.length-1).some(function (i) { return i.length === 0})) {

                // go to next section of form
                this.setState({
                    index: next_page ? this.state.index + 1 : this.state.index - 1,
                })
            }

            // if there is any required field null 
            else {
                // user message
                // Works on both iOS and Android
                Alert.alert(
                    'Falta rellenar información',
                    'Debes rellenar toda la información requerida',
                    [
                        { text: 'Entendido'},
                    ],
                    { cancelable: false },
                );
            }
            
        }

        // if there is another section of form
        else {

            // go to next section of form
            this.setState({
                index: next_page ? this.state.index + 1 : this.state.index - 1,
            })
        }
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

                        <View
                            style = {{
                                // flex: 1,
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center"
                            }}
                        >

                            {this.state.index != 0 && !this.state.wait_store_signature
                            
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
                                        title = "Anterior"
                                        onPress={() => this.change_part(false)}
                                    />
                                :
                                    null
                            }

                            {this.state.index != last_part && !this.state.wait_store_signature

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

                        </View>

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
        height: "70%",
        paddingBottom: 400,
        marginTop: 10
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
    text_title: {
        marginTop: 20, 
        marginBottom: 20, 
        fontWeight: "bold", 
        fontSize: 20, 
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
        margin: 20,
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
    },
    signature: {
        flex: 1,
        // borderColor: '#000033',
        // borderColor: "blue",
        // borderWidth: 10,
    },
    signature_buttons: {
        margin: 10,
    }
})

export default withNavigation(Specific_List);