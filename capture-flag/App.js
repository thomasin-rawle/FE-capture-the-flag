<script src="http://localhost:8097" />;
import React, { Component } from "react";
import redFlag from "./assets/red-flag.png";
import greenFlag from "./assets/green-flag.png";
import {
  Platform,
  Text,
  View,
  StyleSheet,
  Dimensions,
  Button,
  Alert
} from "react-native";
import { Constants, Location, Permissions, MapView } from "expo";
import orange from "./assets/orange.png";
import randomLocation from "random-location";
import geolib from "geolib";

export default class App extends Component {
  state = {
    errorMessage: null,
    loading: true,
    lat: 0,
    long: 0,
    nearFlag: false,
    flagCaptured: false,
    modalVisible: false
  };

  componentWillMount() {
    if (Platform.OS === "android" && !Constants.isDevice) {
      this.setState({
        errorMessage:
          "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }
    Location.watchPositionAsync({ distanceInterval: 5 }, newLocation => {
      if (this.state.lat !== newLocation.coords.latitude) {
        console.log(this.state.lat, "<< state");
        console.log(newLocation.coords.latitude, "<< new location");
        this.setState({
          lat: newLocation.coords.latitude,
          long: newLocation.coords.longitude,
          loading: false
        });
        this.amINear(); 
      }
    });
  };

  captureFlag = () => {
    if (this.state.nearFlag) {
      Alert.alert(
        "Alert Title",
        "My Alert Msg",
        [
          {
            text: "Capture the flag",
            onPress: () => console.log("Flag Captured")
          },
          {
            text: "Leave the flag",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          }
        ],
        { cancelable: false }
      );
    }
  };

  amINear = () => {
    const near = geolib.isPointInCircle(
      { latitude: this.state.lat, longitude: this.state.long },
      { latitude: 53.4858, longitude: -2.2421 }, //need to fetch from BE
      150
    ); // distance is 130 meters
    console.log(near,"nearrrrr");
    if (near) {
      this.setState({
        nearFlag: true
      });
    }
  };
  // checks if 51.525, 7.4575 is within a radius of 5km from 51.5175, 7.4678 //false
  render() {
    if (this.state.loading) {
      return (
        <View style={styles.loading}>
          <Text>Loading...</Text>
        </View>
      );
    } else {
      const screen = Dimensions.get("window");
      const ASPECT_RATIO = screen.width / screen.height;
      const latitudeDelta = 0.005;
      const { lat, long } = this.state;
      const initialRegion = {
        latitudeDelta,
        longitudeDelta: latitudeDelta * ASPECT_RATIO,
        latitude: lat,
        longitude: long
      };
      const flag = this.state.nearFlag?greenFlag:redFlag;
      // console.log(this.state)
      return (
        <View style={{ flex: 1 }}>
          <MapView
            ref={map => {
              this.map = map;
            }}
            style={{ flex: 1 }}
            initialRegion={initialRegion}
            title={"capture flag"}
            showsUserLocation={true}
            followUserLocation={true}
          >
            {/* {this.state.location.coords && (
              <MapView.Marker
                coordinate={{
                  latitude: this.state.location.coords.latitude,
                  longitude: this.state.location.coords.longitude
                }}
                title={'Your Location'}
              />
            )} */}
            {/* <MapView.Marker image={flag} onPress={this.captureFlag}
              coordinate={{
                latitude: randomLocation.randomCirclePoint({ latitude: this.state.lat, longitude: this.state.long }, 500).latitude,
                longitude: randomLocation.randomCirclePoint({ latitude: this.state.lat, longitude: this.state.long }, 500).longitude
              }}
            // title={'Capture Flag'}
            /> */}
            <MapView.Marker
              image={flag}
              onPress={this.captureFlag}
              coordinate={{
                latitude: 53.4858,
                longitude: -2.2421
              }}
              title={"Football Museum"}
            />
          </MapView>
          {/* <View style={styles.buttonContainer}>
            <Button style={styles.button} onPress={() => this.handleRecenter} title="Re-center"></Button>
          </View> */}
        </View>
      );
    }
  }
  // handleRecenter = () => {
  //     // const {lat, long} = this.state;
  //     // this.map.animateToRegion({
  //     //   lat,
  //     //   long,
  //     // })
  //     this.setState({

  //     })
  // }
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1"
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: "center"
  },
  button: {
    backgroundColor: "blue",
    color: "white",
    padding: 20,
    borderRadius: 100
  },
  buttonContainer: {
    position: "absolute",
    bottom: 40,
    right: 20
  }
});
