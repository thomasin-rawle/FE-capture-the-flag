import axios from 'axios';
const BASE_URL = 'https://capture-flag1.herokuapp.com/api';

export const getUser = async username => {
	const { data } = await axios.get(`${BASE_URL}/user/${username}`);
	return data.user;
};
export const patchScore = async (username, scoreUpdate) => {
	const { data } = await axios.patch(`${BASE_URL}/user/${username}?score=${scoreUpdate}`);
};
export const patchFlagLocation = async (username, longUpdate, latUpdate) => {
	const { data } = await axios.patch(`${BASE_URL}/flag/${username}?longitude=${longUpdate}&latitude=${latUpdate}`);
};
export const patchFlagCapture = async username => {
	const { data } = await axios.patch(`${BASE_URL}/flag/${username}/capture`);
};
