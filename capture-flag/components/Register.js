import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TextInput, TouchableHighlight, TouchableOpacity, Image, KeyboardAvoidingView, AsyncStorage } from 'react-native';

import * as api from '../api';
import styles from '../assets/style/loginStyle';
import { FontAwesome } from '@expo/vector-icons';

export default class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			error: false,
			password: '',
			confirm: ''
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
			.addUser({ name, username, password, confirm })
			.then(user => {
				const { name, score, username, flagCaptured, flagGenerated, flagLatitude, flagLongitude } = user;
				const mainUser = { name, score, username, flagCaptured, flagGenerated, flagLatitude, flagLongitude };
				this.setState({
					password: '',
					confirm: '',
					error: false
				});
				AsyncStorage.setItem('mainUser', JSON.stringify(mainUser));
			})
			.then(() => this.props.navigation.navigate('mainStack'))
			.catch(error => {
				this.setState({
					password: '',
					confirm: '',
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
		if (score) return score < 15 ? styles.inputWeak : score < 30 ? styles.inputMedium : styles.inputGood;
	};
	passwordIcon = password => {
		const score = this.passwordStrength(password);
		if (score) return score < 15 ? 'times-circle' : score < 30 ? 'minus-circle' : 'check-circle';
	};

	render() {
		return (
			<KeyboardAvoidingView style={styles.loginContainer} behavior="padding" enabled>
				<TouchableOpacity style={styles.backBtn} onPress={() => this.props.navigation.goBack()}>
					<FontAwesome name="arrow-circle-left" size={40} color="#fff" />
				</TouchableOpacity>
				<View style={styles.logoLoginContainer}>
					<Image style={styles.logoLogin} source={require('../assets/logo-login.png')} />
				</View>

				<View style={styles.loginInputContainer}>
					<TextInput style={styles.loginInput} value={this.state.name} onChangeText={name => this.setState({ name })} placeholder="Name" placeholderTextColor="rgba(255,255,255,0.7)" returnKeyType="next" onSubmitEditing={() => this.emailInput.focus()} />
				</View>
				<View style={styles.loginInputContainer}>
					<TextInput
						style={styles.loginInput}
						value={this.state.username}
						onChangeText={username => this.setState({ username })}
						placeholderTextColor="rgba(255,255,255,0.7)"
						returnKeyType="next"
						ref={input => (this.emailInput = input)}
						onSubmitEditing={() => this.passwordCInput.focus()}
						keyboardType="default"
						autoCapitalize="none"
						autoCorrect={false}
						placeholder="Username"
					/>
				</View>
				<View style={styles.loginInputContainer}>
					<TextInput
						style={styles.loginInput}
						value={this.state.password}
						onChangeText={password => this.setState({ password })}
						placeholder="Password"
						secureTextEntry={true}
						placeholderTextColor="rgba(255,255,255,0.7)"
						ref={input => (this.passwordCInput = input)}
						onSubmitEditing={() => this.passwordInput.focus()}
						returnKeyType="next"
						secureTextEntry
					/>
					{this.state.password.length > 0 && (
						<View style={styles.strengthIndicator}>
							<FontAwesome size={26} name={this.passwordIcon(this.state.password)} style={this.passwordStyle(this.state.password)} />
						</View>
					)}
				</View>
				<View style={styles.loginInputContainer}>
					<TextInput style={styles.loginInput} onChangeText={confirm => this.setState({ confirm })} placeholder="Confirm Password" secureTextEntry={true} placeholderTextColor="rgba(255,255,255,0.7)" returnKeyType="go" secureTextEntry />
					{this.state.error && (
						<View>
							<Text style={{ textAlign: 'center', color: '#ffffff', position: 'absolute', bottom: -40, left: -20, width: 280 }}>Please fill in all the fields</Text>
						</View>
					)}
				</View>
				<View style={styles.loginBtnContainer}>
					<TouchableHighlight style={styles.loginBtn} onPress={() => this.onRegisterPress(this.state)}>
						<Text style={styles.loginBtnText}>Register</Text>
					</TouchableHighlight>
				</View>
			</KeyboardAvoidingView>
		);
	}
}

AppRegistry.registerComponent('Register', () => Register);
