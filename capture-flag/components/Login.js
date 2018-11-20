import React, { Component } from 'react';
import {
	AppRegistry,
	Button,
	KeyboardAvoidingView,
	TouchableHighlight,
	AsyncStorage,
	Image,
	TextInput,
	Text, // Renders text
	View // Container component
} from 'react-native';

import * as api from '../api';
import styles from '../assets/style/loginStyle'

export default class Login extends Component {
	state = {
		error: false
	};

	loginUser = user => {
		api
			.getUserAfterLogin(user)
			.then(user => {
				const { name, score, username, flagCaptured, flagGenerated, flagLat, flagLong, zoneLat, zoneLong } = user;
				const mainUser = { name, score, username, flagCaptured, flagGenerated, flagLat, flagLong, zoneLat, zoneLong };
				this.setState({
					password: '',
					confirm: '',
					error: false
				});
				AsyncStorage.setItem('mainUser', JSON.stringify(mainUser));
				this.props.navigation.navigate('mainStack');
			})
			.catch(error => {
				console.log(error);
				this.setState({
					error: true
				});
			});
	};

	render() {
		return (
				<KeyboardAvoidingView style={styles.loginContainer} behavior="padding" enabled>

					<View style={styles.logoLoginContainer}>
						<Image style={styles.logoLogin} source={require('../assets/logo-login.png')} />
					</View>
						<View style={styles.loginInputContainer}>
							<TextInput style={styles.loginInput}
								placeholder="Username"
								placeholderTextColor="rgba(255,255,255,0.7)"
								returnKeyType="next"
								onSubmitEditing={() => this.passwordInput.focus()}
								keyboardType="default"
								autoCapitalize="none"
								autoCorrect={false}
								value={this.state.username}
								onChangeText={username => this.setState({ username })}
								/>
						</View>
						<View style={styles.loginInputContainer}>
							<TextInput style={styles.loginInput} placeholder="Password" placeholderTextColor="rgba(255,255,255,0.7)" returnKeyType="go" secureTextEntry ref={input => (this.passwordInput = input)} value={this.state.password} onChangeText={password => this.setState({ password })} />
								{this.state.error && <View><Text style={{ textAlign: 'center', color: '#ffffff', position: 'absolute', bottom: -40, left: -20, width:280 }}>Incorrect user details, please try again</Text></View>}
						</View>
						<View style={styles.loginBtnContainer}>
							<TouchableHighlight style={styles.loginBtn}>
								<Text onPress={() => this.loginUser(this.state)} title="Log In" style={styles.loginBtnText}>
									Log In
								</Text>
							</TouchableHighlight>
						</View>
				<View>
					<TouchableHighlight style={styles.signupBtn}>
						<Text style={styles.signupBtnText} onPress={() => this.props.navigation.navigate('Register')} title="Sign up">
							Create an Account
						</Text>
					</TouchableHighlight>
				</View>
				
				{/* <TouchableOpacity style={styles.button}>
					<Text
						style={styles.buttonText}
						// onPress={() => this.props.navigation.navigate("ForgetPassword")}
						title="Forget Password"
					>
						Forgotten Password
					</Text>
				</TouchableOpacity> */}
				</KeyboardAvoidingView>
		);
	}

	// componentDidMount() {
	//   AsyncStorage.getItem('mainUser')
	// .then((res) => {
	//   const { name, username, score } = JSON.parse(res)
	//   this.setState({
	//     mainUser: { name, username, score }
	//   })
	//   console.log(this.state)
	// })
	//   }
}

AppRegistry.registerComponent('Login', () => Login);
