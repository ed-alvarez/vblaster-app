import React, { Component } from 'react';

class Logout extends Component {
	constructor() {
		super();
	}

	componentDidMount() {
		if (!localStorage.getItem('payload')) {
			window.location.href = '/';
			return;
		}

		localStorage.removeItem('payload');
		window.location.href = '/';
	}

	render() {
		return <div></div>;
	}
}

export default Logout;
