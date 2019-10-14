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

// // check net conecction
// import NetInfo from "@react-native-community/netinfo";

// // import firestore
// import {fs} from "../src/firebase";

class Choose_One_List extends Component {

  // Options for header bar
  static navigationOptions = ({ navigation }) => {

    return {
      title: "Escoger una lista de " + navigation.state.params.type,
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

  // Render method
  render() {

    // return method
    return (

        <View>
            
            <FlatList
                data={[
                    {key: 'Devin'},
                    {key: 'Dan'},
                    {key: 'Dominic'},
                    {key: 'Jackson'},
                    {key: 'James'},
                    {key: 'Joel'},
                    {key: 'John'},
                    {key: 'Jillian'},
                    {key: 'Jimmy'},
                    {key: 'Julie'},
                ]}
                renderItem={
                    ({item}) => 

                        <TouchableOpacity onPress={()=> Alert.alert("click")}>
                            <Text>

                                {item.key}

                            </Text>
                        </TouchableOpacity>
                }
            />
            
        </View>

    );

  }

}

// const styles = StyleSheet.create({

// })

// const TabNavigator = createBottomTabNavigator({
//   Places_by_Category: { screen: 'Places_by_Category' },
//   // Settings: { screen: SettingsScreen },
// });

export default withNavigation(Choose_One_List);