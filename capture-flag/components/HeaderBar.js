import React, { Component } from 'react';
import { Text, View, Image, TouchableWithoutFeedback } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import styles from '../assets/style/mainStyle'
import logoLong from '../assets/logo-mainMap.png'
import profilePic from '../assets/profilePic.png'
import {
  Header,
  Left,
  Right,
  Body
} from 'native-base';

class HeaderBar extends Component {
  render() {
    return (
      <View style={styles.topBar} >
        <Left style={styles.user}>
        <TouchableWithoutFeedback onPress={() => this.props.openUserDrawer()} >
        <View style={styles.headerPicContainer}>
          <Image style={styles.headerBarPic} source={profilePic}/>
          </View>
        </TouchableWithoutFeedback>
        </Left>
        <Body style={styles.logo}>
          <Image style={styles.logoLong} source={logoLong}/>
        </Body>
        <Right style={styles.score}>
				  <FontAwesome onPress={() => this.props.openScoreDrawer()} name="trophy" size={30} color="white" />
          <Text style={styles.scoreNumber}>{this.props.score}</Text>
        </Right>
      </View>
    );
  }
}
export default HeaderBar;
