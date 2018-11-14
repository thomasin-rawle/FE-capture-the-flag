<script src="http://localhost:8097" />;
import React, { Component } from 'react';
import { Platform, Text, View, StyleSheet, Dimensions, Button, Alert, Image } from 'react-native';
import { Constants, Location, Permissions, MapView } from 'expo';
import orange from './assets/orange.png';
import randomLocation from 'random-location';

export default class App extends Component {
	state = {
		errorMessage: null,
		loading: true,
		lat: 0,
		long: 0,
		random: true,
		flagCaptured: false,
		modalVisible: false,
		score: 0
	};
	componentWillMount() {
		if (Platform.OS === 'android' && !Constants.isDevice) {
			this.setState({
				errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!'
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
		Location.watchPositionAsync({ distanceInterval: 5 }, newLocation => {
			if (this.state.lat !== newLocation.coords.latitude) {
				console.log(this.state.lat, '<< state');
				console.log(newLocation.coords.latitude, '<< new location');
				this.setState({
					lat: newLocation.coords.latitude,
					long: newLocation.coords.longitude,
					loading: false
				});
			}
		});
	};

	captureFlag = () => {
		if (this.state.random) {
			Alert.alert('Alert Title', 'My Alert Msg', [{ text: 'Capture the flag', onPress: () => this.incrementScore() }, { text: 'Leave the flag', onPress: () => console.log('Cancel Pressed'), style: 'cancel' }], { cancelable: false });
		}
	};

	incrementScore = () => {
		this.setState({
			score: this.state.score + 5
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
			const screen = Dimensions.get('window');
			const ASPECT_RATIO = screen.width / screen.height;
			const latitudeDelta = 0.005;
			const { lat, long } = this.state;
			const initialRegion = {
				latitudeDelta,
				longitudeDelta: latitudeDelta * ASPECT_RATIO,
				latitude: lat,
				longitude: long
			};
			const flag = this.state.random ? require('./assets/green-flag.png') : require('./assets/red-flag.png');
			// console.log(this.state)
			return (
				<View style={{ flex: 1 }}>
					<View style={styles.topBar}>
						<View style={styles.user}>
							<Text>User</Text>
						</View>
						<Image source={require('./assets/icon.png')} style={{ height: 25, width: 25 }} />
						{/* <View style={styles.logo}>
						</View> */}
						<View style={styles.score}>
							<Text>Score: {this.state.score}</Text>
						</View>
					</View>
					<MapView
						ref={map => {
							this.map = map;
						}}
						style={{ flex: 1 }}
						initialRegion={initialRegion}
						title={'capture flag'}
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
						<MapView.Marker
							image={flag}
							onPress={this.captureFlag}
							coordinate={{
								latitude: randomLocation.randomCirclePoint({ latitude: this.state.lat, longitude: this.state.long }, 500).latitude,
								longitude: randomLocation.randomCirclePoint({ latitude: this.state.lat, longitude: this.state.long }, 500).longitude
							}}
							// title={'Capture Flag'}
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
		alignItems: 'center',
		justifyContent: 'center',
		paddingTop: Constants.statusBarHeight,
		backgroundColor: '#ecf0f1'
	},
	paragraph: {
		margin: 24,
		fontSize: 18,
		textAlign: 'center'
	},
	button: {
		backgroundColor: 'blue',
		color: 'white',
		padding: 20,
		borderRadius: 100
	},
	buttonContainer: {
		position: 'absolute',
		bottom: 40,
		right: 20
	},
	topBar: {
		display: 'flex',
		height: 70,
		backgroundColor: 'green',
		justifyContent: 'space-between',
		alignItems: 'flex-end',
		flexDirection: 'row',
		paddingVertical: 10
	},
	user: {
		color: 'black',
		width: 70,
		paddingLeft: 20
	},
	logo: {
		width: 70
	},
	score: {
		color: 'black',
		width: 70
	}
});
