import { getPayload } from '../helpers/payload.helper';

export const FETCH_CAMPAIGN_AUDIO_FILES_BEGING = 'FETCH_CAMPAIGN_AUDIO_FILES_BEGING';
export const FETCH_CAMPAIGN_AUDIO_FILES_SUCCESS = 'FETCH_CAMPAIGN_AUDIO_FILES_SUCCESS';
export const FETCH_CAMPAIGN_AUDIO_FILES_ERROR = 'FETCH_CAMPAIGN_AUDIO_FILES_ERROR';

const getAllAudioFiles = campaignId => dispatch => {
	dispatch({ type: FETCH_CAMPAIGN_AUDIO_FILES_BEGING });

	fetch(`${process.env.API}/campaigns/${campaignId}/audio-files`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${getPayload().token}`
		},
	}).then(res => res.json()).then(data => {
		if (!data.success) {
			return dispatch({
				type: FETCH_CAMPAIGN_AUDIO_FILES_ERROR,
				error: data.message
			});
		}

		dispatch({ type: FETCH_CAMPAIGN_AUDIO_FILES_SUCCESS, payload: data });
	}).catch(() => {
		dispatch({
			type: FETCH_CAMPAIGN_AUDIO_FILES_ERROR,
			error: 'Unable to process request. Failed to fetch API.'
		});
	});
};

const uploadAudioFile = (campaignId, file) => dispatch => {
	dispatch({ type: FETCH_CAMPAIGN_AUDIO_FILES_BEGING });

	const data = new FormData();
	data.append('file', file);

	fetch(`${process.env.API}/campaigns/${campaignId}/audio-files`, {
		method: 'POST',
		headers: {
			'Authorization': `Bearer ${getPayload().token}`
		},
		body: data
	}).then(res => res.json()).then(data => {
		dispatch(getAllAudioFiles(campaignId));

		if (!data.success) {
			return dispatch({
				type: FETCH_CAMPAIGN_AUDIO_FILES_ERROR,
				error: data.message
			});
		}
	}).catch(() => {
		dispatch({
			type: FETCH_CAMPAIGN_AUDIO_FILES_ERROR,
			error: 'Unable to process request. Failed to fetch API.'
		});
	});
};

const deleteAudioFile = (campaignId, fileId, fileName, fileType) => dispatch => {
	dispatch({ type: FETCH_CAMPAIGN_AUDIO_FILES_BEGING });

	fetch(`${process.env.API}/campaigns/${campaignId}/audio-files`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${getPayload().token}`
		},
		body: JSON.stringify({
			file_id: fileId,
			file_name: fileName,
			file_type: fileType
		})
	}).then(res => res.json()).then(data => {
		dispatch(getAllAudioFiles(campaignId));

		if (!data.success) {
			return dispatch({
				type: FETCH_CAMPAIGN_AUDIO_FILES_ERROR,
				error: data.message
			});
		}
	}).catch(() => {
		dispatch({
			type: FETCH_CAMPAIGN_AUDIO_FILES_ERROR,
			error: 'Unable to process request. Failed to fetch API.'
		});
	});
};

export default {
	getAllAudioFiles,
	uploadAudioFile,
	deleteAudioFile
};
