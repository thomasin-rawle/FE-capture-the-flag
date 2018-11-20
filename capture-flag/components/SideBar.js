import React, { Component } from "react";
import {
  Text,
  AsyncStorage,
  TouchableHighlight,
  StyleSheet
} from "react-native";
import { Content } from "native-base";
// import * as api from '../api'

export default class Sidebar extends Component {
  state = {
    name: "",
    username: "",
    score: 0,
    photo: ""
  };

  componentDidMount() {
    this.getUserInfo();
  }
  getUserInfo = () => {
    AsyncStorage.getItem("mainUser").then(mainUser => {
      const userInfo = JSON.parse(mainUser);
      this.setState({
        name: userInfo.name,
        username: userInfo.username,
        score: userInfo.score
      });
    });
  };
  render() {
    const { name, username, score } = this.state;
    const { getDistanceFromFlag } = this.props;
    return (
      <Content style={{ backgroundColor: "#FFFFFF", paddingTop: 90 }}>
        <Text style={styles.drawerItem}>{name}</Text>
        <Text style={styles.drawerItem}>{username}</Text>
        <Text style={styles.drawerItem}>Score: {score}</Text>
        <Text style={styles.drawerItem}>Distance: {getDistanceFromFlag()} meters</Text>
        <TouchableHighlight
          onPress={() => this.props.logOut()}
          style={styles.logOutButton}
        >
          <Text style={{ color: "white", fontSize: 20 }}>Log Out</Text>
        </TouchableHighlight>
      </Content>
    );
  }
}
const styles = StyleSheet.create({
  drawerContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },
  drawerItem: {
    fontSize: 20
  },
  logOutButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 20,
    width: 150,
    backgroundColor: "#00bbff",
    alignItems: "center",
    marginTop: 20
  }
});

module.exports = Sidebar;
