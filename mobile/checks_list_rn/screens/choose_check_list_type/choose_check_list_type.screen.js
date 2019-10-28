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

// import models of local DB
import { List, List_Answers} from "../../models/models";

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

    // this.select_color = this.select_color.bind(this);
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

          // ERROR WHEN BOTH ENV AND SSO are trying to write to local database
          
          // Env lists

          // CHANGE ENV_LIST_NEW_STRUCTURE
          // get lists from server
          // firestore().collection("env_list_new_structure").get().then(snapshotquery => {
          firestore().collection("lists").get().then(snapshotquery => {

            // console.log("Update database of ENV");
            console.log("Update database of lists");

            // if query is not empty
            // update local database. 1) remove prior database 2) write new database
            if (!snapshotquery.empty) {

              let list;

              // new instance of database
              // const realm = new Realm({ schema: [Env_List] });

              // console.log("query: ", realm.objects("Env_List"));

              // delete previous data
              realm.write(() => {
                // realm.deleteAll()
                // realm.delete(realm.objects("Env_List"));
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

          // SSO lists
          // CHANGE SSO_LIST_NEW_STRUCTURE
          // get lists from server
          // firestore().collection("sso_list_new_structure").get().then(snapshotquery => {
          //   console.log("Update database of SSO");

          //   // if query is not empty
          //   // update local database. 1) remove prior database 2) write new database
          //   if (!snapshotquery.empty) {

          //     let list;

          //     // new instance of database
          //     // const realm = new Realm({ schema: [SSO_List] });

          //     // console.log("query: ", realm.objects("SSO_List"));

          //     // delete previous data
          //     realm.write(() => {
          //       // realm.deleteAll()
          //       realm.delete(realm.objects("SSO_List"));
          //     })

          //     // console.log("query: ", realm.objects("List"));

          //     // iterate over each item
          //     snapshotquery.forEach(doc => {

          //       // get document
          //       list = doc.data();
          //       // add id
          //       list["id"] = doc.id;

          //       // write in db
          //       realm.write(() => {
          //         realm.create("SSO_List", list);
          //       });

          //       // // add item to array
          //       sso_lists.push(list);

          //     });

          //     // console.log(env_lists);

          //     console.log("sso lists updated: ", realm.objects("SSO_List"));

          //     console.log("Finish update database of SSO");

          //     // // update state
          //     // this.setState({

          //     //   sso_lists: list,

          //     // });

          //   }

          //   // if query is empty
          //   else {

          //     // doc.data() will be undefined in this case
          //     console.log("No such document!");

          //   }

          // });


          // get stored anwsers and send to server

          // create local DB instance
          // const env_list_anwers = realm.objects('Env_List_Answers');
          // const sso_list_anwers = realm.objects('SSO_List_Answers');
          const list_anwers = realm.objects('List_Answers');

          // For Env Lists (This could be refactorized)

          // check if there is answers
          // if (!(Object.keys(env_list_anwers).length === 0)) {
          if (!(Object.keys(list_anwers).length === 0)) {
            // console.log("Anwsers of env without send were detected. Try to send to server")
            console.log("Anwsers without send were detected. Try to send to server")
            // create batch (do multiple operation once time and all together)
            let batch = firestore().batch();
            // ref of firestore db
            let ref;
            // iterate throught each answer
            // for (var key in env_list_anwers) {
            for (var key in list_anwers) {
              // console.log(env_list_anwers[key]);
              // Create ref (for craete an auto-ID in firesotre)
              // ref = firestore().collection('env_lists_responses').doc();
              ref = firestore().collection('answers').doc();
              // add new doc to batch
              // batch.set(ref, env_list_anwers[key]);// Batch has a limit of 500 element !!
              batch.set(ref, list_anwers[key]);// Batch has a limit of 500 element !!
            }
            // execute batch (if there is an error with any doc, so the full batch is not executed)
            batch.commit().then(()=> {
              // if batch was executed correctly
              // console.log("Stored answers of env were sended to server");
              console.log("Stored answers were sended to server");
              // delete answers
              realm.write(() => {
                // delete all env lists anwsers of local DB
                // realm.delete(realm.objects("Env_List_Answers"));
                realm.delete(realm.objects("List_Answers"));
                // console.log("Answers of env from local DB were deleted from local database because it were sended to server");
                console.log("Answers from local DB were deleted from local database because it were sended to server");
                // repeat with sso lists here
              });
  
            })
          }

          // if there is not answers in local database
          else {
            console.log("There is not answers in DB yet");
          }

          // // check if there is answers
          // if (!(Object.keys(sso_list_anwers).length === 0)) {
          //   console.log("Anwsers of SSO without send were detected. Try to send to server")
          //   // create batch (do multiple operation once time and all together)
          //   let batch = firestore().batch();
          //   // ref of firestore db
          //   let ref;
          //   // iterate throught each answer
          //   for (var key in sso_list_anwers) {
          //     // console.log(sso_list_anwers[key]);
          //     // Create ref (for craete an auto-ID in firesotre)
          //     ref = firestore().collection('sso_lists_responses').doc();
          //     // add new doc to batch
          //     batch.set(ref, sso_list_anwers[key]);// Batch has a limit of 500 element !!
          //   }
          //   // execute batch (if there is an error with any doc, so the full batch is not executed)
          //   batch.commit().then(() => {
          //     // if batch was executed correctly
          //     console.log("Stored answers of sso were sended to server");
          //     // delete answers
          //     realm.write(() => {
          //       // delete all env lists anwsers of local DB
          //       realm.delete(realm.objects("SSO_List_Answers"));
          //       console.log("List_Answers of SSO from local DB were deleted from local database because it were sended to server");
          //       // repeat with sso lists here
          //     });

          //   })
          // }
          // // if there is not answers in local database
          // else {
          //   console.log("There is not answers of SSO in DB yet");
          // }
          
        }
        // it isn't connected to internet
        else {
          console.log("There is not internet connection. Using local database to get list and their questions");

          // get lists from local DB
          // const env_lists_local = realm.objects("Env_List");
          // const sso_lists_local = realm.objects("SSO_List");
          const lists_local = realm.objects("List");

          // add lists from local DB to list (for define in state of component)
          // for (var key in env_lists_local) {
          let element;
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

          // console.log("env lists obtained from local database: ", realm.objects("Env_List"));
          // console.log("sso lists obtained from local database: ", realm.objects("SSO_List"));
          console.log("lists obtained from local database: ", realm.objects("List"));
          // // console.log("query: ", realm.objects("SSO_List"));
          // console.log("env lists answers obtained from local database: ", realm.objects('Env_List_Answers'));
          // console.log("sso lists answers obtained from local database: ", realm.objects('SSO_List_Answers'));
          // console.log(env_lists);
          console.log("lists answers obtained from local database: ", realm.objects('List_Answers'));
          
          
          // // Message to user
          // Alert.alert(
            //   'Ups, tenemos problemas con la conexión a Internet',
            //   'Necesitamos conectarnos a Internet y al parecer no tienes conexión',
            //   [
              //     { text: 'Me conectaré' },
              //   ],
              //   { cancelable: false },
              // )
              
        };

      // }

      // finally {
        // console.log("Close local DB");
        // realm.close();
      // }

      // // array for store lists
      // let env_lists = [];
      // let sso_lists = [];
      // // let lists = [];

      // console.log("final lists: ", lists);

      // // create separated lists
      // for (let i = 0; i < lists.length; ++i) {
      //   if (lists[i].type == "env") {
      //     env_lists.push(lists[i]);
      //   }

      //   else if (lists[i].type == "sso") {
      //     sso_lists.push(lists[i]);
      //   }
      // }
      
      // // update state
      this.setState({

        // env_lists: env_lists,
        // sso_lists: sso_lists,
        // lists: lists,
        // stored_answers: realm.objects('Env_List_Answers').length,
        stored_answers: realm.objects('List_Answers').length,

      });

    });

    // console.log("realm: ", Realm);

    // // new isntance of database
    // const realm = new Realm({ schema: [List] });

    // console.log("query: ", realm.objects("List"));

    // // write in db
    // realm.write(() => {
    //   realm.create("List", {name: "List 1"})
    // });

    // console.log("query: ", realm.objects("List"));

  };

  // Render method
  render() {

    // return method
    return (

        <ImageBackground
        // source={{ uri: "https://images2.alphacoders.com/598/598441.jpg"}}
          style = {{
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
                onPress={() => this.props.navigation.push("Choose_One_List", {category: 'env', lists: this.state.env_lists})}
                buttonStyle = {styles.button}
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
                onPress={() => this.props.navigation.push("Choose_One_List", { category: 'sso', lists: this.state.sso_lists})}
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
                style = {{
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: 50
                }}
              >

                <Text style = {styles.text}>
                  Respuestas por enviar: {this.state.stored_answers} 
                </Text>

                <Text style={styles.sub_text}>
                  Para actualizar este número, debes abrir nuevamente la aplicación
                </Text>

              </View>

              </View>
            :
                <View>
                  <ProgressBarAndroid/>
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