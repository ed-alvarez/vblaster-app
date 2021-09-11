import {
	FETCH_USER_BEGING,
	FETCH_USER_SUCCESS,
	FETCH_USER_ERROR
} from '../actions/user.actions';

const initialState = {
	loading: false,
	payload: {},
	isLoggedIn: false,
	error: null
};

export default (state = initialState, action) => {
	switch (action.type) {
		case FETCH_USER_BEGING:
			return {
				...state,
				loading: true,
				error: null,
			}
		case FETCH_USER_SUCCESS:
			return {
				...state,
				loading: false,
				payload: action.payload,
				isLoggedIn: action.isLoggedIn
			}
		case FETCH_USER_ERROR:
			return {
				...state,
				loading: false,
				payload: action.payload,
				error: action.error
			}
		default:
			return state;
	}
};
