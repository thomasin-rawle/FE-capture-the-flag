import es6promise from 'es6-promise';
import Frisbee from 'frisbee';

es6promise.polyfill();

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
	console.log(latUpdate, longUpdate);
	const { body } = await api.patch(`/flag/${username}`, { latitude: latUpdate, longitude: longUpdate });
	console.log(body.user);
};

export const patchFlagCapture = async username => {
	const { body } = await api.patch(`/flag/${username}/capture`);
};
