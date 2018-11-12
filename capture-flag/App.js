import React, { Component } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import { Constants, Location, Permissions, MapView } from 'expo';

export default class App extends Component {
  state = {
    errorMessage: null,
    location: {},
    loading: true
  };

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage:
          'Oops, this will not work on Sketch in an Android emulator. Try it on your device!'
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied'
      });
    }

    Location.getCurrentPositionAsync({}).then(location => {
      this.setState({
        location,
        loading: false
      });
    });
  };

  render() {
    if (this.state.loading)
      return (
        <View style={styles.loading}>
          <Text>Loading...</Text>
        </View>
      );
    else {
      return (
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitudeDelta: 1,
            longitudeDelta: 1,
            ...this.state.location.coords
          }}
          title={'capture flag'}
          showsUserLocation={true}
          loadingEnabled={true}
        >
          {this.state.location.coords && (
            <MapView.Marker
              coordinate={{
                latitude: this.state.location.coords.latitude,
                longitude: this.state.location.coords.longitude
              }}
              title={'Your Location'}
            />
          )}
        </MapView>
      );
    }
  }
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1'
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center'
  }
});
