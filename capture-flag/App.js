import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Animated,
  Easing,
  AsyncStorage,
  ActivityIndicator,
  Text
} from 'react-native';
import { createStackNavigator, createDrawerNavigator, createSwitchNavigator } from 'react-navigation'
import Login from "./components/Login";
import Register from "./components/Register";
// import ForgetPassword from "./app/components/ForgetPassword";
import { FontAwesome } from '@expo/vector-icons';
import MainMap from "./components/MainMap";
//import { getCenter } from 'geolib';



const MainNavigation = createStackNavigator({
  MainMap: { screen: MainMap }
}, {
  headerMode: 'none',
  navigationOptions: {
  }
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

class App extends Component {

  componentDidMount() {
    console.log('AppNav mounted')
    this._bootstrapAsync();
    
  }
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('mainUser');
    this.props.navigation.navigate(userToken ? 'mainStack' : 'loginStack');
  };
  render() {
    
    return (
     <View>
      <ActivityIndicator size="large" color="#fff" />
     </View>
    );
  }
}
export default createSwitchNavigator(
  {
    AuthLoading: App,
    loginStack: { screen: LoginStack },
    mainStack: { screen: MainNavigation }
  },
  {
    initialRouteName: 'AuthLoading',
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
