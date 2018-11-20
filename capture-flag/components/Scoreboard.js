import React, { Component } from 'react';
import { Text, AsyncStorage, TouchableHighlight, StyleSheet, Image, View } from 'react-native';
import Leaderboard from 'react-native-leaderboard';
import { Content } from 'native-base';
import * as api from '../api';

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
			<Content style={{ backgroundColor: '#FFFFFF', paddingTop: 90 }}>
				<Text style={styles.title}>Leaderboard</Text>
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
		marginTop: 50
	},
	title: {
		padding: 30,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#00bbff',
		fontSize: 20
	},
	userInfo: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center'
	}
});
module.exports = Scoreboard;
