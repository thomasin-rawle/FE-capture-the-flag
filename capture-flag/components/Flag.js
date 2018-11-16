import React from 'react';
import { Button, View } from 'react-native';
import { MapView } from 'expo';
import greenFlag from '../assets/green-flag.png';
import redFlag from '../assets/red-flag.png';

const Flag = props => {
	const flag = props.nearFlag ? greenFlag : redFlag;
	return (
		<View>
			{/* <Button title="Get Location" onPress={() => alert("hello")} /> */}
			{/* <MapView.Marker
				image={flag}
				onPress={props.captureFlag}
				coordinate={{
					latitude: 53.4858,
					longitude: -2.2421
				}}
				title={'Football Museum'}
			/> */}
			{/* {!this.state.flagCaptured ? this.captureFlag : () => alert("flag is captured")} */}
			<MapView.Marker
				image={flag}
				onPress={props.captureFlag}
				coordinate={{
					latitude: props.flagLat,
					longitude: props.flagLong
				}}
				title={'random Flag'}
			/>
		</View>
	);
};

export default Flag;
