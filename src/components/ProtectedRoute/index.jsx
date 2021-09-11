import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import { getPayload } from '../../redux/helpers/payload.helper';

import Auth from '../Auth';

class ProtectedRoute extends Component {
	componentDidUpdate(prevProps) {
		if (this.props.location !== prevProps.location) {
			window.scrollTo(0, 0)
		}
	}

	render() {
		const { comp: Component, ...props } = this.props;

		const payload = getPayload();

		if (!payload || !payload.token || !payload.refreshToken)
			return <Auth />;

		return <Route {...props} render={() => <Component {...props} />} />
	}
}

export default ProtectedRoute
