import { push } from 'connected-react-router';

import { encryptPayload, getPayload } from '../helpers/payload.helper';

export const FETCH_USER_BEGING = 'FETCH_USER_BEGING';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_ERROR = 'FETCH_USER_ERROR';

const login = (username, password) => dispatch => {
	dispatch({ type: FETCH_USER_BEGING });

	fetch(`${process.env.API}/users/auth`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ username, password })
	}).then(res => res.json()).then(data => {
		if (!data.success) {
			return dispatch({
				type: FETCH_USER_ERROR,
				error: 'Wrong username or password.'
			});
		}

		dispatch({ type: FETCH_USER_SUCCESS, isLoggedIn: true });

		localStorage.setItem('payload', encryptPayload(JSON.stringify({
			user_id: data.user_id,
			username: data.username,
			token: data.token,
			refreshToken: data.token
		})));

		dispatch(push('/dashboard'));
	}).catch(err => {
		dispatch({
			type: FETCH_USER_ERROR,
			error: `Unable to process request. ${err.message}`
		});
	});
};

const getUser = () => dispatch => {
	dispatch({ type: FETCH_USER_BEGING });

	const payload = getPayload();

	if (!payload || !payload.token || !payload.refreshToken) {
		window.location.href = '/';
		return;
	}

	fetch(`${process.env.API}/users/@me`, {
		headers: {
			'Authorization': `Bearer ${payload.token}`
		}
	}).then(res => res.json()).then(data => {
		if (!data.success) {
			window.location.href = '/';
			return;
		}

		dispatch({
			type: FETCH_USER_SUCCESS,
			payload: {
				...data
			}
		});
	}).catch(() => {
		dispatch({
			type: FETCH_USER_ERROR,
			error: 'Unable to process request. Failed to fetch API.'
		});

		dispatch(push('/'));
	});
};

export default {
	login,
	getUser
};
