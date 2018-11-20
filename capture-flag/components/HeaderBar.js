import React, { Component } from 'react';
import { Text, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import styles from '../assets/style/mainStyle'
import logoLong from '../assets/logo-mainMap.png'
import {
  Header,
  Left,
  Right,
  Body,
  Title,
} from 'native-base';

class HeaderBar extends Component {
  render() {
    return (
      <Header style={styles.topBar}>
        <Left style={styles.user}>
          <FontAwesome
            onPress={() => this.props.openDrawer()}
            name="user"
            size={30}
            color="white"
          />
        </Left>
        <Body style={styles.logo}>
          <Image style={styles.logoLong} source={logoLong}/>
        </Body>
        <Right style={styles.score}>
          <FontAwesome name="trophy" size={30} color="white" />
          <Text style={styles.scoreNumber}>{this.props.score}</Text>
        </Right>
      </Header>
    );
  }
}

export default HeaderBar;
