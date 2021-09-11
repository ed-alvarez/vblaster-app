import {
	FETCH_CAMPAIGN_AUDIO_FILES_BEGING,
	FETCH_CAMPAIGN_AUDIO_FILES_SUCCESS,
	FETCH_CAMPAIGN_AUDIO_FILES_ERROR
} from '../actions/campaignAudioFiles.actions';

const initialState = {
	loading: false,
	payload: {},
	error: null
};

export default (state = initialState, action) => {
	switch (action.type) {
		case FETCH_CAMPAIGN_AUDIO_FILES_BEGING:
			return {
				...state,
				loading: true,
				error: null,
			}
		case FETCH_CAMPAIGN_AUDIO_FILES_SUCCESS:
			return {
				...state,
				loading: false,
				payload: action.payload
			}
		case FETCH_CAMPAIGN_AUDIO_FILES_ERROR:
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
