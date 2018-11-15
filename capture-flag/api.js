// import axios from 'axios';
// const Frisbee = require("frisbee");
// const BASE_URL = 'https://capture-flag1.herokuapp.com/api';

// export const getUser = async username => {
// 	const { data } = await axios.get(`${BASE_URL}/user/${username}`);
// 	return data.user;
// };
// export const patchScore = async (username, scoreUpdate) => {
// 	const { data } = await axios.patch(`${BASE_URL}/user/${username}?score=${scoreUpdate}`);
// };
// export const patchFlagLocation = async (username, latUpdate, longUpdate) => {
// 	// console.log("data from apiiiii");
// 	const { data } = await axios.patch(`${BASE_URL}/flag/${username}`, {latitude: latUpdate, longitude: longUpdate})
//         //  return data.user;
//        }
// export const patchFlagCapture = async username => {
// 	const { data } = await axios.patch(`${BASE_URL}/flag/${username}/capture`);
// };

// const api = new Frisbee({
// 	baseURI: BASE_URL, // optional
// 	headers: {
// 		'Accept': 'application/json',
// 		'Content-Type': 'application/json'
// 	}
// });

// export const getUser = async username => {
// 	const { body } = await api.get(`/user/${username}`);
// 	return body.user;
// };


import Frisbee from 'frisbee';



const api = new Frisbee({
	baseURI: 'https://capture-flag1.herokuapp.com/api',
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json'
	}
});

export const getUser = async username => {
	const { body } = await api.get(`/user/${username}`);
	return body.user;
};

export const patchScore = async (username, scoreUpdate) => {
	const { body } = await api.patch(`/user/${username}?score=${scoreUpdate}`);
};

export const patchFlagLocation = async (username, latUpdate, longUpdate) => {
	const {body} = await api.patch(`/flag/${username}`, {latitude: latUpdate, longitude: longUpdate });
	console.log(body.user)
	return body.user;
};

export const patchFlagCapture = async username => {
	const { body } = await api.patch(`/flag/${username}/capture`);
};