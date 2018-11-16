import React, { Component } from 'react';
import {Text, View, Button} from 'react-native';

class Drawer extends Component {
  render() {
    return (
      <View>
        <Button onPress={() => console.log('button pressed')} title="Log Out"></Button>
      </View>
    );
  }
}

export default Drawer;
