import React, { Component } from 'react';
import {
  Alert,
  // Platform,
  StyleSheet,
  Button,
  Text,
  View,
  Image,
  ProgressBarAndroid,
  FlatList,
  TouchableOpacity
} from 'react-native';

import { withNavigation } from 'react-navigation';

// realm local database
// const Realm = require('realm');
import Realm from 'realm';

// check net conecction
import NetInfo from "@react-native-community/netinfo";

// import firestore
import firestore from '@react-native-firebase/firestore';

// // check net conecction
// import NetInfo from "@react-native-community/netinfo";

// // import firestore
// import {fs} from "../src/firebase";

// define models
const Env_List = {
  name: "Env_List",
  id: "string",
  properties: {
    name: "string",
    questions: "string[]",
  }
}

const SSO_List = {
  name: "SSO_List",
  id: "string",
  properties: {
    name: "string",
    questions: "string[]",
  }
}

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
      env_lists: [],
      sso_lists: [],
    };

    // this.select_color = this.select_color.bind(this);
  }

  componentDidMount() {

    // check internet connection
    NetInfo.fetch().then(state => {
      
      // array for store lists
      let env_lists = [];
      let sso_lists = [];

      const realm = new Realm({ schema: [Env_List, SSO_List] });

      // if it is connected
      if (state.isConnected) {

        // query to firestore


        // ERROR WHEN BOTH ENV AND SSO are trying to write to local database
        
        // Env lists

        // CHANGE ENV_LIST_NEW_STRUCTURE
        firestore().collection("env_list_new_structure").get().then(snapshotquery => {

          console.log("Update database of ENV");

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
              realm.delete(realm.objects("Env_List"));
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
                realm.create("Env_List", list);
              });

              // // add item to array
              env_lists.push(list);

            });

            // console.log(env_lists);

            console.log("env lists: ", realm.objects("Env_List"));


            // // update state
            // this.setState({

            //   env_lists: env_lists,

            // });

          }

          // if query is empty
          else {

            // doc.data() will be undefined in this case
            console.log("No such document!");

          }

        });

        // SSO lists
        // CHANGE SSO_LIST_NEW_STRUCTURE
        firestore().collection("sso_list_new_structure").get().then(snapshotquery => {

          console.log("Update database of SSO");

          // if query is not empty
          // update local database. 1) remove prior database 2) write new database
          if (!snapshotquery.empty) {

            let list;

            // new instance of database
            // const realm = new Realm({ schema: [SSO_List] });

            // console.log("query: ", realm.objects("SSO_List"));

            // delete previous data
            realm.write(() => {
              // realm.deleteAll()
              realm.delete(realm.objects("SSO_List"));
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
                realm.create("SSO_List", list);
              });

              // // add item to array
              sso_lists.push(list);

            });

            // console.log(env_lists);

            console.log("sso lists: ", realm.objects("SSO_List"));


            // // update state
            // this.setState({

            //   sso_lists: list,

            // });

          }

          // if query is empty
          else {

            // doc.data() will be undefined in this case
            console.log("No such document!");

          }

        });
        //   console.log("Update database");

        //   // if query is not empty
        //   // update local database. 1) remove prior database 2) write new database
        //   if (!snapshotquery.empty) {

        //     let list;

        //     // new instance of database
        //     const realm = new Realm({ schema: [SSO_List] });

        //     console.log("query: ", realm.objects("SSO_List"));

        //     // delete previous data
        //     realm.write(() => {
        //       realm.deleteAll()
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
        //         realm.create("Env_List", list);
        //       });

        //       // // add item to array
        //       env_lists.push(list);

        //     });

        //     // console.log(env_lists);

        //     console.log("query: ", realm.objects("Env_List"));


        //     // update state
        //     this.setState({

        //       env_lists: env_lists,

        //     });

        //   }

        //   // if query is empty
        //   else {

        //     // doc.data() will be undefined in this case
        //     console.log("No such document!");

        //   }

        // });

      }

      // it isn't connected to internet
      else {

        console.log("Using database");

        // get data from local DB

        // new instance of database
        // const realm = new Realm({ schema: [Env_List, SSO_List] });

        // console.log("query: ", realm.objects("List"));

        const env_lists_local = realm.objects("Env_List");
        const sso_lists_local = realm.objects("SSO_List");

        // console.log(env_lists_local[1]);

        for (var key in env_lists_local) {

          // add item to array
          env_lists.push(env_lists_local[key]);

        };

        for (var key in sso_lists_local) {

          // add item to array
          sso_lists.push(sso_lists_local[key]);

        };

        // console.log(env_lists);
        
        
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

      // update state
      this.setState({

        env_lists: env_lists,
        sso_lists: sso_lists,

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

        <View>
            
            <Button
            title="Medio Ambiente"
            //   color="#f194ff"
          onPress={() => this.props.navigation.push("Choose_One_List", { lists: this.state.env_lists})}
            />

            <Button
            title="SSO"
            //   color="#f194ff"
          onPress={() => this.props.navigation.push("Choose_One_List", { lists: this.state.sso_lists})}
            />
            
        </View>

    );

  }

}

const styles = StyleSheet.create({

})

// const TabNavigator = createBottomTabNavigator({
//   Places_by_Category: { screen: 'Places_by_Category' },
//   // Settings: { screen: SettingsScreen },
// });

export default withNavigation(Choose_Check_List_Type);