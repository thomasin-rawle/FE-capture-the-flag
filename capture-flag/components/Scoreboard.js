import React, { Component } from 'react';
import { Text, AsyncStorage, TouchableHighlight, StyleSheet, Image, View } from 'react-native';
import Leaderboard from 'react-native-leaderboard';
import { Content } from 'native-base';
import * as api from '../api';
import { FontAwesome } from '@expo/vector-icons';

export default class Scoreboard extends Component {
	state = {
		data: [{ username: '', image: '', score: 0 }]
	};

	componentDidMount() {
		this.getAllScores();
	}
	getAllScores = () => {
		api
			.getAllUsers()
			.then(users => {
				const scoreData = users.map(user => {
					return { username: user.username, image: user.image, score: user.score };
				});
				return scoreData;
			})
			.then(data => {
				this.setState({
					data
				});
			});
	};
	render() {
		return (
			<Content style={{ backgroundColor: '#FFFFFF'}}>
			<View style={styles.leaderboardHeader}>
				<FontAwesome name="trophy" size={40} color="#FFC200" />
				<Text style={styles.leaderboardTitle}>Leaderboard</Text>
			</View>
				<Leaderboard style={styles.leaderboard} data={this.state.data} sortBy="score" labelBy="username" />
			</Content>
		);
	}
}
const styles = StyleSheet.create({
	leaderboard: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 20,
	},
	leaderboardHeader: {
		paddingTop: 50,
		paddingBottom: 20,
		textAlign: 'center',
		justifyContent: 'center',
		alignItems: 'center'
	},
	leaderboardTitle: {
		paddingTop:10,
		textAlign: 'center',
		fontSize: 20,
		
		color:'#616161'
	},
	userInfo: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center'
	}
});
module.exports = Scoreboard;
