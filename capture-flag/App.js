import React, { Component } from 'react';
import { Platform, Text, View, StyleSheet, Dimensions, Button, Alert, Image } from 'react-native';
import { Constants, Location, Permissions, MapView } from 'expo';
import randomLocation from 'random-location';
import geolib from 'geolib';
import * as api from './api';
import Flag from './components/Flag';

export default class App extends Component {
	state = {
		errorMessage: null,
		loading: true,
		lat: 0,
		long: 0,
		nearFlag: false,
		flagCaptured: false,
		flagGenerated: false,
		flagLat: 0,
		flagLong: 0,
		score: 0
	};
	componentWillMount() {
		if (Platform.OS === 'android' && !Constants.isDevice) {
			this.setState({
				errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!'
			});
		} else {
			this._getLocationAsync();

			api.getUser('NickyBee').then(user =>
				this.setState(
					{
						score: user.score,
						flagCaptured: user.flagCaptured,
						flagGenerated: user.flagGenerated,
						flagLat: user.flagLatitude,
						flagLong: user.flagLongitude,
						username: user.username
					},
					() => {
						console.log(user.flagLatitude, user.flagLongitude);
						if (!user.flagGenerated) this.generateFlag(user.username);
					}
				)
			);
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
				this.setState({
					lat: newLocation.coords.latitude,
					long: newLocation.coords.longitude,
					loading: false
				});
				this.amINear();
			}
		});
	};
	generateFlag = username => {
		const flagCoordinate = {
			latitude: randomLocation.randomCirclePoint({ latitude: this.state.lat, longitude: this.state.long }, 500).latitude,
			longitude: randomLocation.randomCirclePoint({ latitude: this.state.lat, longitude: this.state.long }, 500).longitude
		};
		api.patchFlagLocation(username, flagCoordinate.latitude, flagCoordinate.longitude);
		this.setState({
			flagLat: flagCoordinate.latitude,
			flagLong: flagCoordinate.longitude,
			flagGenerated: true
		});
	};

	captureFlag = () => {
		if (this.state.nearFlag) {
			Alert.alert(
				'Alert Title',
				'My Alert Msg',
				[
					{
						text: 'Capture the flag',
						onPress: () => {
							this.incrementScore();
							api.patchFlagCapture(this.state.username, this.state.flagLong, this.state.flagLat);
							this.setState({
								flagCaptured: true
							});
						}
					},
					{ text: 'Leave the flag', onPress: () => console.log('Cancel Pressed'), style: 'cancel' }
				],
				{ cancelable: false }
			);
		}
	};

	incrementScore = () => {
		const scoreUpdate = 5;
		api.patchScore(this.state.username, scoreUpdate);
		this.setState({
			score: this.state.score + scoreUpdate
		});
	};
	amINear = () => {
		const near = geolib.isPointInCircle({ latitude: this.state.lat, longitude: this.state.long }, { latitude: this.state.flagLat, longitude: this.state.flagLong }, 20);
		this.setState({
			nearFlag: near
		});
	};

	render() {
		console.log(this.state.flagCaptured);
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
			return (
				<View style={{ flex: 1 }}>
					<View style={styles.topBar}>
						<View style={styles.user}>
							<Text>User</Text>
						</View>
						<View style={styles.logo}>
							<Image source={require('./assets/icon.png')} style={{ height: 25, width: 25 }} />
						</View>
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
						{/* {this.state.flagLat && this.state.flagLong && (
							<MapView.Marker
								image={flag}
								onPress={this.captureFlag}
								coordinate={{
									latitude: this.state.flagLat,
									longitude: this.state.flagLong
								}}
								title={'Capture Flag'}
							/>
						)} */}
						{/* FLAG COMPONENT */}

						{!this.state.flagCaptured && <Flag captureFlag={this.captureFlag} flagCaptured={this.state.flagCaptured} nearFlag={this.state.nearFlag} flagLat={this.state.flagLat} flagLong={this.state.flagLong} />}
					</MapView>
				</View>
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
		justifyContent: 'center',
		alignItems: 'flex-end',
		flexDirection: 'row',
		paddingVertical: 10
	},
	user: {
		color: 'black',
		flex: 1,
		alignItems: 'center',
		flexGrow: 1
	},
	logo: {
		flex: 1,
		alignItems: 'center',
		flexGrow: 2
	},
	score: {
		color: 'black',
		flex: 1,
		alignItems: 'center',
		flexGrow: 1
	}
});
