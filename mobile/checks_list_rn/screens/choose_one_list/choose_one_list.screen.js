import React, { Component } from 'react';
import {
  Alert,
  // Platform,
//   StyleSheet,
//   Button,
  Text,
  View,
//   Image,
//   ProgressBarAndroid,
  FlatList,
  TouchableOpacity
    // TouchableHighlight,
} from 'react-native';

import { withNavigation } from 'react-navigation';

// import firestore
import { fs } from "../../src/firebase";

// check net conecction
import NetInfo from "@react-native-community/netinfo";

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

      // category of list
      category: this.props.navigation.state.params.category,
      // lists
      list: [],

    };

  }

  componentDidMount() {

    // check internet connection
    NetInfo.fetch().then(state => {

      // if it is connected
      if (state.isConnected) {

        // query to firestore
        fs.collection(this.state.category).get().then(snapshotquery => {

          // if query is not empty
          if (!snapshotquery.empty) {

            // array for store lists
            let lists = [];
            let list;

            // iterate over each item
            snapshotquery.forEach(doc => {

              // get document
              list = doc.data();
              // add id
              list["id"] = doc.id;
              // add item to array
              lists.push(list);

            });

            // update state
            this.setState({

              lists: lists,

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
                data={this.state.lists}
                renderItem={
                    ({item}) => 

                      <TouchableOpacity onPress={() => this.props.navigation.push("Specific_List", { list: item, category: this.state.category })}>
                            <Text>
                                {item.name}
                            </Text>
                        </TouchableOpacity>
                }
            />
            
        </View>

    );

  }

}

export default withNavigation(Choose_One_List);