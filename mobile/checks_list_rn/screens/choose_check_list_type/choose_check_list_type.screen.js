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

// // check net conecction
// import NetInfo from "@react-native-community/netinfo";

// // import firestore
// import {fs} from "../src/firebase";

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

    };

    // this.select_color = this.select_color.bind(this);
  }

  componentDidMount(){

  };

  // Render method
  render() {

    // return method
    return (

        <View>
            
            <Button
            title="Medio Ambiente"
            //   color="#f194ff"
            onPress={() => this.props.navigation.push("Choose_One_List", {type: "env"})}
            />

            <Button
            title="SSO"
            //   color="#f194ff"
            onPress={() => this.props.navigation.push("Choose_One_List", {type: "sso"})}
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