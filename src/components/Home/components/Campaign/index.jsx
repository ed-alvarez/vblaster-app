import './Campaign.scss';

import React, { Component } from 'react';
import { Switch, Route, Link, withRouter } from 'react-router-dom';

import General from './component/General';
import AudioFiles from './component/AudioFiles';
import Numbers from './component/Numbers';

class Campaign extends Component {
	constructor() {
		super();
	}

	goTo(route) {
		this.props.history.push(route);
	}

	render() {
		return (
			<div className="campaign">
				<Link to="/dashboard" className="go-back">
					<i className="fas fa-chevron-left"></i> Go Back
				</Link>

				<div className="campaign-card">
					<div className="sidebar-menu">
						<div className="menu-child" onClick={() => this.goTo(`/dashboard/campaign/${this.props.match.params.campaign_id}`)}>
							<i className="far fa-columns"></i>
							<span>General</span>
						</div>
						<div className="menu-child" onClick={() => this.goTo(`/dashboard/campaign/${this.props.match.params.campaign_id}/audio-files`)}>
							<i className="far fa-file-audio"></i>
							<span>Audio Files</span>
						</div>
						<div className="menu-child" onClick={() => this.goTo(`/dashboard/campaign/${this.props.match.params.campaign_id}/numbers`)}>
							<i className="far fa-hashtag"></i>
							<span>Numbers</span>
						</div>
						<div className="menu-child delete">
							<i className="far fa-trash"></i>
							<span>Delete</span>
						</div>
					</div>
					<div className="right-container">
						<div className="container-fluid">
							<Switch>
								<Route exact path={`/dashboard/campaign/${this.props.match.params.campaign_id}`}
									render={() => <General campaignId={this.props.match.params.campaign_id} />} />
								<Route path={`/dashboard/campaign/${this.props.match.params.campaign_id}/audio-files`}
									render={() => <AudioFiles campaignId={this.props.match.params.campaign_id} />} />
								<Route path={`/dashboard/campaign/${this.props.match.params.campaign_id}/numbers`}
									component={Numbers} />
							</Switch>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(Campaign);

