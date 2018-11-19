import React, { Component } from 'react';
import {Text, View, Button, AsyncStorage, TouchableHighlight, StyleSheet} from 'react-native';
// import * as api from '../api'

class Drawer extends Component {

  state = {
    name: '',
    username:'',
    score: 0,
    photo: ''
  }

  componentDidMount () {
    this.getUserInfo()
  }
  logOutUser = () => {
    AsyncStorage.removeItem('mainUser')
    this.props.navigation.navigate('Login')
  }
  getUserInfo = () => {
    AsyncStorage.getItem('mainUser')
    .then(mainUser => {
      const userInfo = JSON.parse(mainUser)
      this.setState({
        name: userInfo.name,
        username: userInfo.username,
        score: userInfo.score
      })
    })
  }
  render() {
    const {name, username, score} = this.state
    return (
      <View style={styles.drawerContainer}>
        <Text style={styles.drawerItem}>{name}</Text>
        <Text style={styles.drawerItem}>{username}</Text>
        <Text style={styles.drawerItem}>Score: {score}</Text>
        <TouchableHighlight onPress={() => this.logOutUser()} style={styles.logOutButton} >
          <Text style={{color: 'white', fontSize:20}}>Log Out</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  drawerContainer: {
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    padding: 20
  },
  drawerItem: {
    fontSize:20,
  },
  logOutButton: {
      backgroundColor: 'blue',
      padding: 10,
      borderRadius: 20,
      width: 150,
      backgroundColor: '#00bbff',
      alignItems: 'center',
      marginTop: 20
  }
})

export default Drawer;
