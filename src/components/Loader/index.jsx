import './Loader.scss';

import React, { Component } from 'react';
import BarLoader from "react-spinners/BarLoader";

class Loader extends Component {
	constructor() {
		super();
	}

	render() {
		return (
			<div className="container">
				<div className="row d-flex justify-content-center loader">
					<BarLoader color={'#8c3cf6'} />
				</div>
			</div>
		);
	}
}

export default Loader;
