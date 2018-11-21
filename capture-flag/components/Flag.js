import React from 'react';
import { Button, View, Image } from 'react-native';
import { MapView } from 'expo';
import greenFlag from '../assets/green-flag.png';
import redFlag from '../assets/red-flag.png';

const Flag = ({nearFlag, captureFlag, flagLat, flagLong}) => {
	const flag = nearFlag ? greenFlag : redFlag;
	return (
		<View>
			<MapView.Marker
				onPress={captureFlag}
				anchor={{x: 0.2, y: 0.8}}
				coordinate={{
					latitude: flagLat,
					longitude: flagLong
				}}>
			<Image source={flag} style={{width:50, height:55}} />
			</MapView.Marker>
		</View>
	);
};

export default Flag;
