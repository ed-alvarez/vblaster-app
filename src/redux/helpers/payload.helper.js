const encryptPayload = payload => btoa(payload);

const getPayload = () => {
	if (!localStorage.getItem('payload'))
		return false;

	try {
		const payload = JSON.parse(atob(localStorage.getItem('payload')));

		if (!payload || !payload.token || !payload.refreshToken)
			return false;

		return payload;
	} catch {
		return false;
	}
};

export {
	encryptPayload,
	getPayload
};
