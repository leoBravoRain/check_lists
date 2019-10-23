import React from 'react';

import {
  createAppContainer
} from 'react-navigation';

import { createStackNavigator } from 'react-navigation-stack'

import Home from "./screens/home/home.screen";
import Choose_Check_List_Type from "./screens/choose_check_list_type/choose_check_list_type.screen";
import Choose_One_List from "./screens/choose_one_list/choose_one_list.screen";
import Specific_List from "./screens/specific_list/specific_list.screen";

// firebase
import firestore from '@react-native-firebase/firestore';

// firebase offline behavier configuration
async function bootstrap() {
  await firestore().settings({
    persistence: true,
    cacheSizeBytes: firestore.CACHE_SIZE_UNLIMITED, // unlimited cache size
  });
}

const AppStackNavigator = createStackNavigator(
  // {headerLayoutPreset: 'center'},
  {

    Home: Home,
    Choose_Check_List_Type: Choose_Check_List_Type,
    Choose_One_List: Choose_One_List,
    Specific_List: Specific_List,
    // Place_Details: Place_Details,
    // Add_Video: Add_Video,
    // Map: Main_Map,
    // Location_Details: Location_Details,
    // Add_Place: Add_Place,

  },

  { 
    headerMode: 'screen',
    headerLayoutPreset: 'center'
  },

  {
    initialRouteName: "Home",
    // headerLayoutPreset: 'center',
    defaultNavigationOptions: {

      // headerLayoutPreset: 'center',

      //  headerStyle: {
      //   backgroundColor: '#3f5fe0',
      // },
      // headerTintColor: '#3f5fe0',
      // headerTitleStyle: {
      //   fontWeight: 'bold',
      // },
      // headerStyle: { backgroundColor: 'red' },
      // headerTitleStyle: { color: 'green' },

      headerStyle: {
        elevation: 10,
      },
      // headerTintColor: '#fff',
      // headerTitleStyle: {
      //   fontWeight: 'bold',
      // },
    }
  },


);


const App = createAppContainer(AppStackNavigator);

export default App;