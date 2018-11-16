import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Animated,
  Easing
} from 'react-native';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation'
import Login from "./components/Login";
import Register from "./components/Register";
// import ForgetPassword from "./app/components/ForgetPassword";
import { FontAwesome } from '@expo/vector-icons';
import MainMap from "./components/MainMap";
import Drawer from './components/Drawer'
import Score from './components/Score'
//import { getCenter } from 'geolib';


const DrawerStack = createDrawerNavigator({
  MainMap: {
        screen: MainMap,
        navigationOptions: {
          title: "MainMap"
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
  Register: { screen: Register },
  // ForgetPassword: { screen: ForgetPassword }
}, {
  headerMode: 'none',
  navigationOptions: {

  }
})

export default App = createStackNavigator({
  loginStack: { screen: LoginStack },
   mainStack: { screen: MainNavigation }
}, {
  // Default config for all screens
  
  headerMode: 'none',
  title: 'Main',
  initialRouteName: 'loginStack',
  
})

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
