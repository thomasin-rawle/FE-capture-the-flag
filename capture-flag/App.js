import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Animated,
  Easing
} from 'react-native';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation'
import Login from "./components/Login";
// import Login from "./components/Login";
// import Register from "./components/Register";
// import ForgetPassword from "./app/components/ForgetPassword";
import { FontAwesome } from '@expo/vector-icons';
import MainMap from "./components/MainMap";
import Drawer from './components/Drawer'
import Score from './components/Score'
//import { getCenter } from 'geolib';


// export default App = createStackNavigator({
//   Home: {
//     screen: Home,
//     navigationOptions: {
//       title: "Home"
//     }
//   },
//   MainMap: {
//     screen: MainMap,
//     navigationOptions: {
//       title: "Map"
//     }
//   }
// });
const noTransitionConfig = () => ({
  transitionSpec: {
    duration: 0,
    timing: Animated.timing,
    easing: Easing.step0
  }
})

// drawer stack
const DrawerStack = createDrawerNavigator({
  MainMap: {
        screen: MainMap,
        navigationOptions: {
          title: "Map"
        }
      }
}, {
  gesturesEnabled: false,
  contentComponent: Drawer
})
const MainNavigation = createStackNavigator({
  DrawerStack: { screen: DrawerStack }
}, {
  headerMode: 'float',
  navigationOptions: ({navigation}) => ({
    
    gesturesEnabled: false,
    headerLayoutPreset: 'center',
    title: 'Flag Land',
    headerLeft: <FontAwesome onPress={() => navigation.toggleDrawer()} name="user" size={30} color="white" />,
    headerRight: <Score />,
    headerStyle: {backgroundColor: '#00bbff'},
    headerTitleStyle: {color: '#fff', fontSize: 20, fontWeight: 'bold'},
    headerLeftContainerStyle: {paddingHorizontal: 20},
    headerRightContainerStyle: {paddingHorizontal: 20},
    
      
  })
})
const LoginStack = createStackNavigator({
  Login: { screen: Login },
  // Register: { screen: Register },
  // ForgetPassword: { screen: ForgetPassword }
}, {
  headerMode: 'float',
  navigationOptions: {
    headerStyle: {backgroundColor: '#E73536'},
    title: 'You are not logged in',
    headerTintColor: 'white'
  }
})

export default App = createStackNavigator({
  loginStack: { screen: LoginStack },
   mainStack: { screen: MainNavigation }
}, {
  // Default config for all screens
  headerMode: 'none',
  title: 'Main',
  initialRouteName: 'mainStack',
  transitionConfig: noTransitionConfig
})

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
