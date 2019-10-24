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

// // realm local database
// // const Realm = require('realm');
// import Realm from 'realm';

// // check net conecction
// import NetInfo from "@react-native-community/netinfo";

// // import firestore
// import firestore from '@react-native-firebase/firestore';

// // define models
// const List = {
//   name: "List",
//   properties: {
//     name: "string",
//     questions: "string[]",
//   }
// }

class Home extends Component {

  // Options for header bar
  static navigationOptions = ({ navigation }) => {

    return {
      title: "Lista de chequeos",
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

    };

    // this.select_color = this.select_color.bind(this);
  }

  // componentDidMount(){

  //   // check internet connection
  //   NetInfo.fetch().then(state => {

  //     // if it is connected
  //     if (state.isConnected) {

  //       // query to firestore
  //       // fs.collection(this.state.category).get().then(snapshotquery => {
  //       // firestore().collection(this.state.category).get().then(snapshotquery => {
  //       // firestore().collection(this.state.category).get().onSnapshot(snapshotquery => {
  //       firestore().collection("env_list_new_structure").get().then(snapshotquery => {

  //         // console.log("new implementation!");

  //         // if query is not empty
  //         // update local database. 1) remove prior database 2) write new database
  //         if (!snapshotquery.empty) {

  //           // array for store lists
  //           let lists = [];
  //           let list;
            
  //           // new instance of database
  //           const realm = new Realm({ schema: [List] });
            
  //           console.log("query: ", realm.objects("List"));

  //           // delete previous data
  //           realm.write(() => {
  //             realm.deleteAll()
  //           })
            
  //           // console.log("query: ", realm.objects("List"));

  //           // iterate over each item
  //           snapshotquery.forEach(doc => {

  //             // get document
  //             list = doc.data();
  //             // add id
  //             list["id"] = doc.id;
              
  //             // write in db
  //             realm.write(() => {
  //               realm.create("List", list);
  //             });
              
  //             // // add item to array
  //             lists.push(list);

  //           });

  //           // console.log(lists);

  //           console.log("query: ", realm.objects("List"));


  //           // update state
  //           this.setState({

  //             lists: lists,

  //           });

  //         }

  //         // if query is empty
  //         else {

  //           // doc.data() will be undefined in this case
  //           console.log("No such document!");

  //         }

  //       });

  //     }

  //     // it isn't connected to internet
  //     else {

  //       // get data from local DB


  //       // // Message to user
  //       // Alert.alert(
  //       //   'Ups, tenemos problemas con la conexión a Internet',
  //       //   'Necesitamos conectarnos a Internet y al parecer no tienes conexión',
  //       //   [
  //       //     { text: 'Me conectaré' },
  //       //   ],
  //       //   { cancelable: false },
  //       // )

  //     };

  //   });

  //   // console.log("realm: ", Realm);

  //   // // new isntance of database
  //   // const realm = new Realm({ schema: [List] });

  //   // console.log("query: ", realm.objects("List"));

  //   // // write in db
  //   // realm.write(() => {
  //   //   realm.create("List", {name: "List 1"})
  //   // });

  //   // console.log("query: ", realm.objects("List"));
    
  // };

  // Render method
  render() {

    // return method
    return (

        <Button
          title="Chequeo"
        //   color="#f194ff"
          onPress={() => this.props.navigation.push("Choose_Check_List_Type")}
        />

    );

  }

}

const styles = StyleSheet.create({

})

// const TabNavigator = createBottomTabNavigator({
//   Places_by_Category: { screen: 'Places_by_Category' },
//   // Settings: { screen: SettingsScreen },
// });

export default withNavigation(Home);