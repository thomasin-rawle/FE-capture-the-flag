import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Header, Left, Right, Body, Title } from 'native-base';

class HeaderBar extends Component {
	render() {
		return (
			<Header style={styles.topBar}>
				<Left style={styles.user}>
					<FontAwesome onPress={() => this.props.openUserDrawer()} name="user" size={30} color="white" />
				</Left>
				<Body>
					<Title style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>FlagLand</Title>
				</Body>
				<Right style={styles.score}>
					<FontAwesome onPress={() => this.props.openScoreDrawer()} name="trophy" size={30} color="white" />
					<Text style={styles.scoreNumber}>{this.props.score}</Text>
				</Right>
			</Header>
		);
	}
}

const styles = StyleSheet.create({
	topBar: {
		backgroundColor: '#00bbff',
		justifyContent: 'center'
	},
	user: {
		color: 'white',
		alignItems: 'center'
	},
	logo: {
		flex: 1,
		alignItems: 'center'
	},
	score: {
		color: 'white',
		display: 'flex',
		flex: 1,
		alignItems: 'flex-end',
		justifyContent: 'center'
	},
	scoreNumber: {
		color: 'white',
		fontSize: 20,
		paddingLeft: 5
	}
});

export default HeaderBar;
