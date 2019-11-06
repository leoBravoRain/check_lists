import React, { Component } from 'react';
import {
  Alert,
  // Platform,
  StyleSheet,
  // Button,
  Text,
  View,
  Image,
  ProgressBarAndroid,
  FlatList,
  TouchableOpacity,
  ImageBackground
} from 'react-native';

// RN elements
import { Button } from 'react-native-elements'

import { withNavigation } from 'react-navigation';

// realm local database
import Realm from 'realm';

// check net conecction
import NetInfo from "@react-native-community/netinfo";

// import firestore
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

// import models of local DB
import { List, List_Answers } from "../../models/models";

class Choose_Check_List_Type extends Component {

  // Options for header bar
  static navigationOptions = ({ navigation }) => {

    return {
      title: "Escoger tipo de lista",
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

    this.state = {
      get_lists: false,
      env_lists: [],
      sso_lists: [],
      // lists: [],
      stored_answers: 0,
    };

  }

  componentDidMount() {

    console.log("Component did mount");

    // check internet connection
    NetInfo.fetch().then(state => {

      // // array for store lists
      // let lists = [];
      let env_lists = [];
      let sso_lists = [];

      // local DB isntance
      // const realm = new Realm({ schema: [Env_List, SSO_List, Env_List_Answers, SSO_List_Answers] });
      const realm = new Realm({ schema: [List, List_Answers] });

      // try {

      // if it is connected
      if (state.isConnected) {
        console.log("Internet connection was detected");
        // query to firestore

        // get lists from server
        // firestore().collection("env_list_new_structure").get().then(snapshotquery => {
        firestore().collection("lists").get().then(snapshotquery => {

          // console.log("Update database of ENV");
          console.log("Update database of lists");

          // if query is not empty
          // update local database. 1) remove prior database 2) write new database
          if (!snapshotquery.empty) {

            // define list
            let list;

            // delete previous data
            realm.write(() => {
              realm.delete(realm.objects("List"));
            })

            // console.log("query: ", realm.objects("List"));

            // iterate over each item
            snapshotquery.forEach(doc => {

              // get document
              list = doc.data();
              // add id
              list["id"] = doc.id;

              // write in db
              realm.write(() => {
                // realm.create("Env_List", list);
                realm.create("List", list);
              });

              console.log(list);
              // add item to array
              // env_lists.push(list);
              // lists.push(list);
              if (list.type == "env") {
                env_lists.push(list);
              }

              else if (list.type == "sso") {
                sso_lists.push(list);
              }

            });

            // console.log("env lists updated: ", realm.objects("Env_List"));
            console.log("lists updated: ", realm.objects("List"));

            console.log("Finish update database of Lists");
            // update state
            this.setState({

              // lists: lists,
              env_lists: env_lists,
              sso_lists: sso_lists,
              get_lists: true,

            });

          }

          // if query is empty
          else {

            // doc.data() will be undefined in this case
            console.log("No such document!");

          }

        });

        // get stored anwsers and send to server

        // create local DB instance
        const list_anwers = realm.objects('List_Answers');

        // check if there is answers
        // if (!(Object.keys(env_list_anwers).length === 0)) {
        if (!(Object.keys(list_anwers).length === 0)) {
          // console.log("Anwsers of env without send were detected. Try to send to server")
          console.log("Anwsers without send were detected. Try to send to server")
          // // create batch (do multiple operation once time and all together)
          // let batch = firestore().batch();
          // // ref of firestore db
          // let ref;
          // iterate throught each answer
          // for (var key in env_list_anwers) {
          // var key = 0;
          // // This need to be async becuase of loop for index
          // const forLoop = async _ => {

          // for (key in list_anwers) {
          // for each(answer in list_anwers) {
          // const forLoop = async _ => {
          list_anwers.forEach((answer) => {

            console.log("answer!: ", answer);

            // upload file to storage
            console.log("For cycle with key: ", key);
            // var local_list = list_anwers[key];
            // const ref = storage().ref('signatures/' + list_anwers[key].name_list).putFile(list_anwers[key].signature_img);
            // let downloadUrl = storage().ref(list_anwers[key].name_list).getDownloadURL();
            var storageRef = storage().ref('signatures/' + 'test.png');
            // store file in firebase store
            // storageRef.putFile(list_anwers[key].signature_img).then(snapshot=> {
            // storageRef.putFile(list_anwers[key].signature_img).then(snapshot => {
            storageRef.putFile(answer.signature_img).then(snapshot => {

              //   console.log("store file");

              // console.log("inside putFile: ", answer);
              // return array of downloadurl and answer
              const result = [storageRef.getDownloadURL(), answer];

              // return value
              return result;

            })
              .then((result) => {

                // wait until all promises finish
                Promise.all(result).then((values) => {

                  // when all promises are ready
                  console.log("all promises: ", values[1].name_list);

                  // console.log(`Successfully uploaded file and got download link - ${downloadURL}`);

                  // update signature url
                  // var local_list = list_anwers[key];
                  var local_list = values[1];
                  // local_list["signature_img"] = downloadURL;
                  // console.log("write signature img in local list");
                  // local_list["signature_img"] = values[0];
                  // console.log("after writing signagure img in loca list");
                  // console.log("Key: " + key);
                  // console.log("local list: " + local_list['user_data'][1]);
                  // console.log("Answer list inside download: " + answer_);
                  // console.log("results: ", downloadURL);
                  // console.log("local list: ", local_list);
                  // create list to send
                  const local_list_2 = {
                    id_list: local_list.id_list,
                    name_list: local_list.name_list,
                    user_data: local_list.user_data,
                    answers: local_list.answers,
                    answers_observations: local_list.answers_observations,
                    type: local_list.type,
                    // signature_img: downloadURL,
                    signature_img: values[0],
                  }

                  console.log("after overwrite signature img");

                  // Copy in DB
                  firestore().collection("answers").add(local_list_2)

                    .then((docRef) => {
                      console.log("Document written in server with ID: ", docRef.id);

                      // delete list from local DB
                      realm.write(() => {
                        console.log("trying to delete list from local BD");
                        // delete all env lists anwsers of local DB
                        // realm.delete(realm.objects("Env_List_Answers"));
                        // realm.delete(list_anwers[key]);
                        realm.delete(values[1]);
                        console.log("Delete list from local BD");

                      });
                      // chagen waiting state
                      this.setState({
                        wait: false,
                      });
                      // Works on both iOS and Android
                      Alert.alert(
                        'Lista enviada',
                        'Se han enviado correctamente tus respuestas',
                        [
                          { text: 'Entendido' },
                          // { text: 'Entendido', onPress: () => this.props.navigation.dispatch(resetAction)},
                        ],
                        { cancelable: false },
                      );

                    })

                    // })
                    .catch((error) => {
                      // this.setState({
                      //   wait: false,
                      // });
                      console.error("Error adding document: ", error);
                      // Alert message
                      // Works on both iOS and Android
                      Alert.alert(
                        'Error',
                        'Ha ocurrido un error, porfavor vuelve a abrir la aplicación y asegúrate de tener buena señal de internet.',
                        [
                          { text: 'Lo intentaré de nuevo' },
                        ],
                        { cancelable: false },
                      );
                    });
                })
              });
          })
          // })

          // // console.log(env_list_anwers[key]);
          // // Create ref (for craete an auto-ID in firesotre)
          // // ref = firestore().collection('env_lists_responses').doc();
          // ref = firestore().collection('answers').doc();
          // // add new doc to batch
          // // batch.set(ref, env_list_anwers[key]);// Batch has a limit of 500 element !!
          // batch.set(ref, list_anwers[key]);// Batch has a limit of 500 element !!
          // // execute batch (if there is an error with any doc, so the full batch is not executed)
          // batch.commit().then(()=> {
          //   // if batch was executed correctly
          //   // console.log("Stored answers of env were sended to server");
          //   console.log("Stored answers were sended to server");
          //   // delete answers
          //   realm.write(() => {
          //     // delete all env lists anwsers of local DB
          //     // realm.delete(realm.objects("Env_List_Answers"));
          //     realm.delete(realm.objects("List_Answers"));
          //     // console.log("Answers of env from local DB were deleted from local database because it were sended to server");
          //     console.log("Answers from local DB were deleted from local database because it were sended to server");
          //     // send user message
          //     Alert.alert(
          //       'Envio automático de listas almacenadas en dispositivo',
          //       'Hemos dectectado conexión a internet, por lo que  hemos enviado las listas sin enviar almacenadas en tu dispositivo. Vuelve a abrir la aplicación para actualizar el número de listas sin enviar',
          //       [
          //           { text: 'Entendido' },
          //         ],
          //         { cancelable: false },
          //     )
          //   });

          // })
        }
        // if there is not answers in local database
        else {
          console.log("There is not answers in DB yet");
        }


      }
      // it isn't connected to internet
      else {

        console.log("There is not internet connection. Using local database to get list and their questions");

        // get lists from local DB
        const lists_local = realm.objects("List");

        // add lists from local DB to list (for define in state of component)
        let element;
        // iterate through each list
        for (var key in lists_local) {
          // add item to array depending of type
          element = lists_local[key];
          console.log(element);
          if (element.type == "env") {
            env_lists.push(element);
          }
          else if (element.type == "sso") {
            sso_lists.push(element);
          }
        };

        // update state
        this.setState({

          // lists: lists,
          env_lists: env_lists,
          sso_lists: sso_lists,
          get_lists: true,

        });

        // log messages
        console.log("lists obtained from local database: ", realm.objects("List"));
        console.log("lists answers obtained from local database: ", realm.objects('List_Answers'));

      };

      // update state
      this.setState({
        stored_answers: realm.objects('List_Answers').length,
      });

    });

  };

  // Render method
  render() {

    // return method
    return (

      <ImageBackground
        // source={{ uri: "https://images2.alphacoders.com/598/598441.jpg"}}
        style={{
          // justifyContent: 'center',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          // alignItems: 'center',
        }}
      >

        {this.state.get_lists

          ?

          <View>

            <Button
              title="Medio Ambiente"
              //   color="#f194ff"
              onPress={() => this.props.navigation.push("Choose_One_List", { category: 'env', lists: this.state.env_lists })}
              buttonStyle={styles.button}
              icon={{
                name: "envira",
                // size: 15,
                color: "white",
                type: "font-awesome",
                iconStyle: { marginRight: 10 },
              }}
            />

            <Button
              // fontSize = {1000}
              title="Seguridad y Salud Ocupacional"
              //   color="#f194ff"
              onPress={() => this.props.navigation.push("Choose_One_List", { category: 'sso', lists: this.state.sso_lists })}
              buttonStyle={styles.button}
              icon={{
                name: "plus-square",
                // size: 15,
                color: "white",
                type: "font-awesome",
                iconStyle: { marginRight: 10 },
              }}
            />

            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                margin: 50
              }}
            >

              <Text style={styles.text}>
                Respuestas por enviar: {this.state.stored_answers}
              </Text>

              <Text style={styles.sub_text}>
                Para actualizar este número, debes abrir nuevamente la aplicación
                </Text>

            </View>

          </View>
          :
          <View>
            <ProgressBarAndroid />
            <Text>
              Cargando datos
                  </Text>
          </View>
        }

      </ImageBackground>

    );

  }

}

const styles = StyleSheet.create({
  text: {
    fontSize: 25,
  },
  sub_text: {
    fontSize: 13,
  },
  button: {
    margin: 10,
    height: 50,
    // padding: 35,
    // fontSize: 40,
    // width: "100%",
    // alignContent: "center",
    // justifyContent: "center"
    // backgroundColor: "red"
  }
})

// const TabNavigator = createBottomTabNavigator({
//   Places_by_Category: { screen: 'Places_by_Category' },
//   // Settings: { screen: SettingsScreen },
// });

export default withNavigation(Choose_Check_List_Type);