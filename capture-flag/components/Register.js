import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TextInput, TouchableHighlight, Image, KeyboardAvoidingView, AsyncStorage, TouchableOpacity } from 'react-native';
import * as api from '../api';

import { createStackNavigator } from 'react-navigation';

export default class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			error: false
		};
	}

	static navigationOptions = {
		headerStyle: {
			backgroundColor: '#16a085',
			elevation: null
		}
	};

	onRegisterPress = user => {
		const { name, username, password, confirm } = user;
		api
			.addUser({ name, username, confirm, password: password.value })
			.then(user => {
				const { name, score, username, flagCaptured, flagGenerated, flagLatitude, flagLongitude } = user;
				const mainUser = { name, score, username, flagCaptured, flagGenerated, flagLatitude, flagLongitude };
				this.setState({
					password: '',
					confirm: '',
					error: false
				});
				AsyncStorage.setItem('mainUser', JSON.stringify(mainUser));
				this.props.navigation.navigate('mainStack');
			})
			.catch(error => {
				this.setState({
					error: true
				});
			});
	};
	passwordStrength = password => {
		let score = 0;
		if (!password) return score;

		let letters = new Object();
		for (let i = 0; i < password.length; i++) {
			letters[password[i]] = (letters[password[i]] || 0) + 1;
			score += 1 / letters[password[i]];
		}
		const variations = {
			digit: /\d/.test(password),
			lowercaseLetter: /[a-z]/.test(password),
			uppercaseLetter: /[A-Z]/.test(password),
			specialCharacter: /[^a-zA-Z0-9]/.test(password)
		};

		let count = 0;
		for (let check in variations) {
			if (variations[check] === true) count += variations[check] === true ? 1 : 0;
		}
		score += (count - 1) * 10;
		return Math.round(score);
	};
	passwordStyle = password => {
		const score = this.passwordStrength(password);
		if (!score) return styles.input;
		return score < 15 ? styles.inputWeak : score < 30 ? styles.inputMedium : styles.inputGood;
	};

	render() {
		// const text = this.state.nameExist ? 'Username already exists, please try again' : null
		return (
			<View behavior="padding" style={styles.container}>
				<View style={styles.logoContainer}>
					<Text style={styles.subtext}>Sign Up:</Text>
				</View>
				<TouchableOpacity style={styles.button}>
					<Text style={styles.buttonText} onPress={() => this.props.navigation.navigate('Login')} title="Go Back">
						Back to login
					</Text>
				</TouchableOpacity>
				{this.state.error && <Text style={{ textAlign: 'center', color: '#ffffff', paddingBottom: 40 }}>Please fill in all the fields</Text>}
				<KeyboardAvoidingView>
					<TextInput value={this.state.name} onChangeText={name => this.setState({ name })} style={styles.input} placeholder="Name" placeholderTextColor="rgba(255,255,255,0.7)" returnKeyType="next" onSubmitEditing={() => this.emailInput.focus()} />
					<TextInput
						value={this.state.username}
						onChangeText={username => this.setState({ username })}
						style={styles.input}
						placeholderTextColor="rgba(255,255,255,0.7)"
						returnKeyType="next"
						ref={input => (this.emailInput = input)}
						onSubmitEditing={() => this.passwordCInput.focus()}
						keyboardType="default"
						autoCapitalize="none"
						autoCorrect={false}
						placeholder="Username"
					/>
					<TextInput
						value={this.state.password}
						onChangeText={password => this.setState({ password })}
						style={this.passwordStyle(this.state.password)}
						// style={styles.input}
						placeholder="Password"
						secureTextEntry={true}
						placeholderTextColor="rgba(255,255,255,0.7)"
						ref={input => (this.passwordCInput = input)}
						onSubmitEditing={() => this.passwordInput.focus()}
						returnKeyType="next"
						secureTextEntry
					/>
					<TextInput
						onChangeText={confirm => this.setState({ confirm })}
						style={styles.input}
						placeholder="Confirm Password"
						secureTextEntry={true}
						placeholderTextColor="rgba(255,255,255,0.7)"
						returnKeyType="go"
						secureTextEntry
						// ref={input => (this.passwordInput = input)}
					/>
				</KeyboardAvoidingView>
				<TouchableHighlight onPress={() => this.onRegisterPress(this.state)} style={styles.button}>
					<Text style={styles.buttonText}>Register</Text>
				</TouchableHighlight>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1.2,
		justifyContent: 'flex-start',
		alignItems: 'center',
		backgroundColor: '#16a085',
		padding: 20,
		paddingTop: 100
	},
	logoContainer: {
		alignItems: 'center',
		flexGrow: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	logo: {
		width: 200,
		height: 150
	},
	input: {
		height: 40,
		width: 350,
		marginBottom: 10,
		backgroundColor: 'rgba(255,255,255,0.2)',
		color: '#fff',
		paddingHorizontal: 10
	},
	inputWeak: {
		height: 40,
		width: 350,
		marginBottom: 10,
		backgroundColor: '#fe6c6c',
		color: '#fff',
		paddingHorizontal: 10
	},
	inputMedium: {
		height: 40,
		width: 350,
		marginBottom: 10,
		backgroundColor: '#feb466',
		color: '#fff',
		paddingHorizontal: 10
	},
	inputGood: {
		height: 40,
		width: 350,
		marginBottom: 10,
		backgroundColor: '#6cfeb5',
		color: '#fff',
		paddingHorizontal: 10
	},
	button: {
		height: 50,
		backgroundColor: 'rgba(255,255,255,0.2)',
		alignSelf: 'stretch',
		marginTop: 10,
		justifyContent: 'center',
		paddingVertical: 15,
		marginBottom: 10
	},
	buttonText: {
		fontSize: 18,
		alignSelf: 'center',
		textAlign: 'center',
		color: '#FFF',
		fontWeight: '700'
	},
	subtext: {
		color: '#ffffff',
		width: 160,
		textAlign: 'center',
		fontSize: 35,
		fontWeight: 'bold',
		marginTop: 20
	}
});

AppRegistry.registerComponent('Register', () => Register);
