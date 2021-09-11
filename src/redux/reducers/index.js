import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import userReducer from './user.reducer';
import campaignReducer from './campaign.reducer';
import campaignAudioFilesReducer from './campaignAudioFiles.reducer';

const rootReducer = history => combineReducers({
	router: connectRouter(history),
	userReducer,
	campaignReducer,
	campaignAudioFilesReducer
});

export default rootReducer;
