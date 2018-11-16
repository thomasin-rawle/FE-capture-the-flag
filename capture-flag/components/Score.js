import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet
   
  } from 'react-native';
  import { FontAwesome } from '@expo/vector-icons';
  import * as api from '../api'
  
  class Score extends Component {
    state= {
      score: 0
    }
    componentDidMount(){
      this.getScore()
    }
    render() {
      return (
        <View style={styles.score}>
          <FontAwesome name="trophy" size={30} color="white" />
          <Text style={styles.scoreNumber}>{this.state.score}</Text>
        </View>
      );
    }
    getScore = () => {
      api.getUser('NickyBee')
      .then(user => {
        this.setState({
          score: user.score
        })
      })
    }
  }
  
  export default Score;

const styles = StyleSheet.create({
    score: {
      color: 'white',
      display: 'flex',
      flex: 1,
      alignItems: 'flex-end',
      justifyContent: 'center',
      flexDirection: 'row'
    },
    scoreNumber: {
      color: 'white',
      fontSize: 20,
      paddingLeft: 5
    }
  });

