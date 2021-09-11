import './Home.scss';

import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import NotFound from '../NotFound';

import TopBar from './components/TopBar';
import Footer from './components/Footer';
import Overview from './components/Overview';
import Campaign from './components/Campaign';

class Home extends Component {
	constructor() {
		super();
	}

	render() {
		return (
			<div>
				<TopBar {...this.props} />
				<div className="container wrapper">
					<Switch>
						<Redirect exact from="/dashboard" to="/dashboard/home" />
						<Route path="/dashboard/home"
							component={Overview} />
						<Route path="/dashboard/campaign/:campaign_id"
							component={Campaign} />
						<Route component={NotFound} />
					</Switch>
				</div>
				<Footer />
			</div>
		);
	}
}

export default Home;
