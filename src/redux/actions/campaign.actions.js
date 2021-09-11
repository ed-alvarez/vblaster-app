import { getPayload } from '../helpers/payload.helper';

export const FETCH_CAMPAIGN_BEGING = 'FETCH_CAMPAIGN_BEGING';
export const FETCH_CAMPAIGN_SUCCESS = 'FETCH_CAMPAIGN_SUCCESS';
export const FETCH_CAMPAIGN_ERROR = 'FETCH_CAMPAIGN_ERROR';

export const FETCH_CAMPAIGN_STATUS_BEGING = 'FETCH_CAMPAIGN_STATUS_BEGING';
export const FETCH_CAMPAIGN_STATUS_SUCCESS = 'FETCH_CAMPAIGN_STATUS_SUCCESS';
export const FETCH_CAMPAIGN_STATUS_ERROR = 'FETCH_CAMPAIGN_STATUS_ERROR';

const getAllCampaigns = () => dispatch => {
	dispatch({ type: FETCH_CAMPAIGN_BEGING });

	fetch(`${process.env.API}/campaigns`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${getPayload().token}`
		},
	}).then(res => res.json()).then(data => {
		if (!data.success) {
			return dispatch({
				type: FETCH_CAMPAIGN_ERROR,
				error: data.message
			});
		}

		dispatch({ type: FETCH_CAMPAIGN_SUCCESS, payload: data });
	}).catch(() => {
		dispatch({
			type: FETCH_CAMPAIGN_ERROR,
			error: 'Unable to process request. Failed to fetch API.'
		});
	});
};

const getCampaign = campaignId => dispatch => {
	dispatch({ type: FETCH_CAMPAIGN_BEGING });

	fetch(`${process.env.API}/campaigns/${campaignId}`, {
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${getPayload().token}`
		}
	}).then(res => res.json()).then(data => {
		if (!data.success) {
			return dispatch({
				type: FETCH_CAMPAIGN_ERROR,
				error: data.message
			});
		}

		dispatch({ type: FETCH_CAMPAIGN_SUCCESS, payload: data });
	}).catch(() => {
		dispatch({
			type: FETCH_CAMPAIGN_ERROR,
			error: 'Unable to process request. Failed to fetch API.'
		});
	});
};

const filterCampaigns = filter => dispatch => {
	dispatch({ type: FETCH_CAMPAIGN_BEGING });

	fetch(`${process.env.API}/campaigns`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${getPayload().token}`
		},
	}).then(res => res.json()).then(data => {
		if (!data.success) {
			return dispatch({
				type: FETCH_CAMPAIGN_ERROR,
				error: data.message
			});
		}

		const filteredPayload = data.campaigns.map(data => {
			if (filter == 'all')
				return data;

			if (data.status == filter)
				return data;

			return false;
		}).filter(f => f);


		if (filteredPayload.length == 0) {
			return dispatch({
				type: FETCH_CAMPAIGN_SUCCESS,
				payload: {
					campaigns: 'NONE'
				}
			})
		}

		dispatch({
			type: FETCH_CAMPAIGN_SUCCESS,
			payload: {
				campaigns: filteredPayload
			}
		});
	}).catch(() => {
		dispatch({
			type: FETCH_CAMPAIGN_ERROR,
			error: 'Unable to process request. Failed to fetch API.'
		});
	});
};

const updateCampaignStatus = (campaignId, status) => dispatch => {
	dispatch({ type: FETCH_CAMPAIGN_BEGING });

	fetch(`${process.env.API}/campaigns/${campaignId}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${getPayload().token}`
		},
		body: JSON.stringify({
			status
		})
	}).then(res => res.json()).then(data => {
		if (!data.success) {
			return dispatch({
				type: FETCH_CAMPAIGN_ERROR,
				error: data.message
			});
		}

		fetch(`${process.env.API}/campaigns/${campaignId}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${getPayload().token}`
			},
		}).then(res => res.json()).then(data => {
			if (!data.success) {
				return dispatch({
					type: FETCH_CAMPAIGN_ERROR,
					error: data.message
				});
			}

			dispatch({ type: FETCH_CAMPAIGN_SUCCESS, payload: data });
		}).catch(() => {
			dispatch({
				type: FETCH_CAMPAIGN_ERROR,
				error: 'Unable to process request. Failed to fetch API.'
			});
		});
	}).catch(() => {
		dispatch({
			type: FETCH_CAMPAIGN_ERROR,
			error: 'Unable to process request. Failed to fetch API.'
		});
	});
};

const updateCampaign = (campaignId, payload) => dispatch => {
	dispatch({ type: FETCH_CAMPAIGN_BEGING });

	fetch(`${process.env.API}/campaigns/${campaignId}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${getPayload().token}`
		},
		body: JSON.stringify({
			...payload
		})
	}).then(res => res.json()).then(data => {
		if (!data.success) {
			return dispatch({
				type: FETCH_CAMPAIGN_ERROR,
				error: data.message
			});
		}

		dispatch(getCampaign(campaignId));
	}).catch(() => {
		dispatch({
			type: FETCH_CAMPAIGN_ERROR,
			error: 'Unable to process request. Failed to fetch API.'
		});
	});
};

const resetCampaign = campaignId => dispatch => {
	dispatch({ type: FETCH_CAMPAIGN_BEGING });

	fetch(`${process.env.API}/campaigns/${campaignId}/reset`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${getPayload().token}`
		}
	}).then(res => res.json()).then(data => {
		if (!data.success) {
			return dispatch({
				type: FETCH_CAMPAIGN_ERROR,
				error: data.message
			});
		}

		fetch(`${process.env.API}/campaigns/${campaignId}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${getPayload().token}`
			},
		}).then(res => res.json()).then(data => {
			if (!data.success) {
				return dispatch({
					type: FETCH_CAMPAIGN_ERROR,
					error: data.message
				});
			}

			dispatch({ type: FETCH_CAMPAIGN_SUCCESS, payload: data });
		}).catch(() => {
			dispatch({
				type: FETCH_CAMPAIGN_ERROR,
				error: 'Unable to process request. Failed to fetch API.'
			});
		});
	}).catch(() => {
		dispatch({
			type: FETCH_CAMPAIGN_ERROR,
			error: 'Unable to process request. Failed to fetch API.'
		});
	});
};


export default {
	getAllCampaigns,
	getCampaign,
	filterCampaigns,
	updateCampaignStatus,
	updateCampaign,
	resetCampaign
};
