import './Footer.scss';

import React, { Component } from 'react';

class Footer extends Component {
	constructor() {
		super();
	}

	render() {
		return (
			<div className="footer">
				<div className="container">
					<div className="row">
						<div className="col-lg-1 col-sm-12">
							<div className="logo"></div>
						</div>
						<div className="col-lg-11 col-sm-12">
							<span className="cc">
								{new Date().getFullYear()} All rights reserved. A product made by <b>eaãm</b>.
							</span>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Footer;
