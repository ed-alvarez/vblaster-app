import './Overview.scss';

import classNames from 'classnames';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import campaignActions from '../../../../redux/actions/campaign.actions';

import Loader from '../../../Loader';
import CampaignCard from './components/CampaignCard';

class Overview extends Component {
	constructor() {
		super();

		this.Campaigns = this.Campaigns.bind(this);

		this.state = {
			activeFilter: 'all'
		};
	}

	componentDidMount() {
		this.props.getAllCampaigns();
	}

	filterData(filter) {
		switch (filter) {
			case 'all':
				this.props.filterCampaigns('all');
				this.setState({ activeFilter: 'all' });
				break;
			case 'stopped':
				this.props.filterCampaigns(0);
				this.setState({ activeFilter: 'stopped' });
				break;
			case 'active':
				this.props.filterCampaigns(1);
				this.setState({ activeFilter: 'active' });
				break;
			case 'completed':
				this.props.filterCampaigns(2);
				this.setState({ activeFilter: 'completed' });
				break;
		}
	}

	Campaigns() {
		return (
			<div>
				<h1 className="component-title">Active Campaigns</h1>
				<div className="component-container">
					<div className="btn-header">
						<div className="row">
							<div className="col-lg-8 col-md-12 col-12">
								<button onClick={() => this.filterData('all')} className={classNames('btn btn-outline', {
									active: this.state.activeFilter == 'all'
								})}>All</button>
								<button onClick={() => this.filterData('active')} className={classNames('btn btn-outline', {
									active: this.state.activeFilter == 'active'
								})}>Active</button>
								<button onClick={() => this.filterData('completed')} className={classNames('btn btn-outline', {
									active: this.state.activeFilter == 'completed'
								})}>Completed</button>
								<button onClick={() => this.filterData('stopped')} className={classNames('btn btn-outline', {
									active: this.state.activeFilter == 'stopped'
								})}>Stopped</button>
							</div>
						</div>
					</div>
					<div className="c-card">
						{this.props.payload.campaigns == 'NONE' ? <div className="text-center p-5">
							<span>No campaigns found.</span>
						</div> : <CampaignCard data={this.props.payload.campaigns} />}
					</div>
				</div>
			</div>
		);
	}

	render() {
		const { loading, payload, error } = this.props;

		if (loading)
			return <Loader />;

		if (error) {
			return (
				<div className="col-sm-6">
					<div className="c-alert danger">
						<i className="fas fa-exclamation-triangle"></i> {error}
					</div>
				</div>
			);
		}

		if (payload.total == 0) {
			return (
				<div className="no-campaigns">
					<h5>Looks like you don’t have any campaigns yet.</h5>
					<span>Fortunately, it’s very easy to create one.</span>
					<button className="btn btn-add">Create Campaign</button>
				</div>
			);
		}

		return (
			<div>
				{payload.campaigns && <this.Campaigns />}
			</div>
		);
	}
}
const mapStateToProps = state => ({
	loading: state.campaignReducer.loading,
	payload: state.campaignReducer.payload,
	error: state.campaignReducer.error
});

const mapDispatchToProps = dispatch => ({
	getAllCampaigns: () => dispatch(campaignActions.getAllCampaigns()),
	filterCampaigns: (filter, payload) => dispatch(campaignActions.filterCampaigns(filter, payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Overview);
