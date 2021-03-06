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
  TouchableOpacity
    // TouchableHighlight,
} from 'react-native';

// import { Divider } from 'react-native-elements';

import { withNavigation } from 'react-navigation';

// // import firestore
// // import { fs } from "../../src/firebase";
// // import firestore from '@react-native-firebase/firestore';
// import  firestore from '@react-native-firebase/firestore';

// // check net conecction
// import NetInfo from "@react-native-community/netinfo";

class Choose_One_List extends Component {

  // Options for header bar
  static navigationOptions = ({ navigation }) => {

    return {
      title: "Escoger una lista",
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

    // // choose category
    // var category = "";
    // // this is the DB name
    // if (this.props.navigation.state.params.category == "env") {
    //   category = "env_lists";
    // }
    // else if (this.props.navigation.state.params.category == "sso") {
    //   category = "sso_lists";
    // }

    // set states
    this.state = {

      // // category of list
      // category: this.props.navigation.state.params.category,
      // // lists
      // list: this.props.navigation.state.params.lists,

    };

  }

  componentDidMount() {

    // // check internet connection
    // NetInfo.fetch().then(state => {

    //   // if it is connected
    //   if (state.isConnected) {

    //     // query to firestore
    //     // fs.collection(this.state.category).get().then(snapshotquery => {
    //     // firestore().collection(this.state.category).get().then(snapshotquery => {
    //     // firestore().collection(this.state.category).get().onSnapshot(snapshotquery => {
    //     firestore().collection(this.state.category).onSnapshot(snapshotquery => {
    //     // onSnapshot

    //       // console.log("new implementation!");

    //       // if query is not empty
    //       if (!snapshotquery.empty) {

    //         // array for store lists
    //         let lists = [];
    //         let list;

    //         // iterate over each item
    //         snapshotquery.forEach(doc => {

    //           // get document
    //           list = doc.data();
    //           // add id
    //           list["id"] = doc.id;
    //           // add item to array
    //           lists.push(list);

    //         });

    //         // update state
    //         this.setState({

    //           lists: lists,

    //         });

    //       }

    //       // if query is empty
    //       else {

    //         // doc.data() will be undefined in this case
    //         console.log("No such document!");

    //       }

    //     });

    //   }

    //   // it isn't connected to internet
    //   else {

    //     // Message to user
    //     Alert.alert(
    //       'Ups, tenemos problemas con la conexión a Internet',
    //       'Necesitamos conectarnos a Internet y al parecer no tienes conexión',
    //       [
    //         { text: 'Me conectaré' },
    //       ],
    //       { cancelable: false },
    //     )

    //   };

    // });

  }
  
  // componentWillUnmount () {

  //   // unsuscribe update from real data base firebase
  //   unsuscribe();

  //   console.log("unsuscribe!");
    
  // }

  // Render method
  render() {

    // return method
    return (

        <View>
            
          {this.props.navigation.state.params.lists.length > 0
          ?
            <FlatList
              data = {this.props.navigation.state.params.lists}
              renderItem={
                  ({item, index}) => 
                    <TouchableOpacity 
                      onPress={() => this.props.navigation.push("Specific_List", { list: item, category: this.props.navigation.state.params.category})}
                      style = {styles.item}  
                      key={index}
                    >
                      <Text style={styles.text}>
                              {item.name}
                          </Text>
                      {/* <Divider style={{ backgroundColor: 'blue' }} />; */}
                    </TouchableOpacity>
              }
            />
          :
              <View
                // style = {{
                //   display: "flex",
                //   alignContent: "center",
                //   justifyContent: "center",
                // }}
              >

                <Text style = {{margin: 50, fontSize: 20, textAlign:"center"}}>
                  Actualmente no existen listas de esta categoría
                </Text>
                <Text style={{ margin: 50, fontSize: 12, textAlign: "center" }}>
                  Intenta conectarte a internet y abrir nuevamente la aplicación
                </Text>

              </View>
          }
            
        </View>

    );

  }

}

const styles = StyleSheet.create({
  item: {
    margin: 15,
    borderBottomWidth: 1,
    padding: 20,
    borderBottomColor: "rgba(14, 20, 27, 0.21)"
    // borderBo
  },
  text: {
    fontSize: 18,
    margin: 10,
  }
})

export default withNavigation(Choose_One_List);