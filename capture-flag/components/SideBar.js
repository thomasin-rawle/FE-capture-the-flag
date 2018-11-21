import React, { Component } from 'react';
import {Text, View, AsyncStorage, TouchableHighlight, Image} from 'react-native';
import {Content} from 'native-base';
// import * as api from '../api'
import styles from '../assets/style/mainStyle'
import profilePic from '../assets/profilePic.png'
import { FontAwesome } from '@expo/vector-icons';
import flagsCounted from '../assets/flags-counted-icon.png'

export default class Sidebar extends Component {

  state = {
    name: '',
    username:'',
    score: 0,
    photo: ''
  }

  componentDidMount () {
    this.getUserInfo()
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
      <Content style={styles.userDrawerContainer} contentContainerStyle={{
        flex: 1
      }}>
      <View style={styles.profilePicContainer}>
        <Image style={styles.profilePic} source={profilePic}/>
      </View>
      <View style={styles.namesContainer}>
      <Text style={[styles.drawerItem, styles.name]}>{name}</Text>
      <Text style={styles.drawerItem}>@{username}</Text>
      </View>

        <View style={styles.drawerLine}></View>

        <View style={styles.statsContainer}>
          <View style={styles.drawerStatItem}>
            <View style={styles.drawerItemIcon}><FontAwesome name="trophy" size={36} color="#616161" /></View>
            <View><Text style={styles.drawerStat}>Score</Text></View>
            <View style={styles.drawerItemStat}><Text style={[styles.drawerStat, {fontWeight: 'bold'}]}>{score}</Text></View>
          </View>
          <View style={styles.drawerStatItem}>
            <View style={styles.drawerItemIcon}><FontAwesome name="map-marker" size={36} color="#616161" /></View>
            <View><Text style={styles.drawerStat}>Flag Distance</Text></View>
            <View style={styles.drawerItemStat}><Text style={[styles.drawerStat, {fontWeight: 'bold'}]}>{score}</Text></View>
          </View>
          <View style={styles.drawerStatItem}>
            <View style={styles.drawerItemIcon}><Image style={{width:32, height:32}} source={flagsCounted}/></View>
            <View><Text style={styles.drawerStat}>Flags Captured</Text></View>
            <View style={styles.drawerItemStat}><Text style={[styles.drawerStat, {fontWeight: 'bold'}]}>{score / 5}</Text></View>
          </View>
         
        </View>

         <View style={styles.logOutButtonContainer}>
          <TouchableHighlight onPress={() => this.props.logOut()} style={styles.logOutButton} >
            <Text style={{color: 'white', fontSize:20}}>Log Out</Text>
          </TouchableHighlight>
         </View>
      </Content>
    );
  }
}
// const styles = StyleSheet.create({
  

// })

module.exports = Sidebar;
