import './CampaignCard.scss';

import moment from 'moment';
import classNames from 'classnames';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import campaignActions from '../../../../../../redux/actions/campaign.actions';

class CampaignCard extends Component {
	constructor() {
		super();

		this.state = {
			search: '',
			currentlyDisplayed: [],
			perPage: 4,
			currentPage: 0,
			pageCount: null
		};

		this.onInputChange = this.onInputChange.bind(this);
		this.searchInput = this.searchInput.bind(this);
		this.moveToPage = this.moveToPage.bind(this);
		this.pages = this.pages.bind(this);
	}

	componentDidMount() {
		this.setState({
			currentlyDisplayed: this.props.data.slice(0, this.state.perPage),
			pageCount: Math.ceil(this.props.data.length / this.state.perPage)
		});
	}

	onInputChange(e) {
		if (e.target.value.length == 0) {
			return this.setState({
				currentlyDisplayed: this.props.data.slice(
					this.state.currentPage * this.state.perPage,
					(this.state.currentPage + 1) * this.state.perPage)
			});
		}

		const newDisplayed = this.props.data.filter(data =>
			data.campaign_name.toLowerCase().includes(e.target.value.toLowerCase()) ||
			data.campaign_description.toLowerCase().includes(e.target.value.toLowerCase())
		);

		this.setState({
			search: e.target.value,
			currentlyDisplayed: newDisplayed
		});
	}

	handlePageClick(e) {
		const selectedPage = e.target.id;

		this.setState({
			currentPage: selectedPage
		});
	}

	searchInput() {
		return (
			<div className="row c-row">
				<div className="col-lg-12">
					<div className="card-child">
						<input onChange={this.onInputChange} placeholder="Search for a campaign..." />
					</div>
				</div>
			</div>
		);
	}

	moveToPage(page) {
		window.scrollTo({
			top: 0,
			bottom: 0
		});

		this.setState({
			currentPage: page
		}, () => {
			this.setState({
				currentlyDisplayed: this.props.data.slice(
					this.state.currentPage * this.state.perPage,
					(this.state.currentPage + 1) * this.state.perPage)
			});
		});
	}

	pages() {
		const numOfPages = [];

		for (let i = 0; i < this.state.pageCount; i++) {
			numOfPages.push(i);
		}

		return numOfPages.map(page =>
			<span className={classNames({
				active: page == this.state.currentPage
			})} onClick={() => this.moveToPage(page)} key={page}>{page + 1}</span>
		);
	}

	render() {
		return (
			<div>
				{this.props.data.length >= 4 && <this.searchInput />}
				{this.state.currentlyDisplayed.map((data, key) => (
					<div className="row c-row" key={key}>
						<div className="col-lg-12">
							<div className="card-child">
								<div className="row">
									<div className="col-lg-9">
										<h4 className="card-title">{
											data.campaign_name.length >= 35 ? `${data.campaign_name.substring(0, 35)}...`
												: data.campaign_name
										}</h4>
										<span className="card-desc">
											{data.campaign_description}
										</span>
										<div className="card-element">
											<div className="campaign-status">
												<span>Status:</span>
												<div className={`status ${classNames({
													'status-stopped': data.status === 0,
													'status-running': data.status === 1,
													'status-completed': data.status === 2
												})}`}></div>
											</div>
										</div>
										<div className="card-element">
											<div className="campaign-id">
												<span>Campaign ID:</span>
												<span className="id">{data.campaign_id}</span>
											</div>
										</div>
									</div>
									<div className="col-lg-3 card-details text-center">
										<span className="card-desc">
											Created {moment.unix(data.created_on).fromNow()}
										</span>
										<Link to={`/dashboard/campaign/${data.campaign_id}`}
											className="btn btn-archive">
											<i className="fas fa-cog"></i> Settings
									</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
				))}
				{this.state.pageCount && this.state.pageCount > 1 &&
					<div className="pagination">
						<div className="prev"
							onClick={() => this.moveToPage(this.state.currentPage != 0 ? this.state.currentPage - 1 : 0)}></div>
						<this.pages />
						<div className="next"
							onClick={() => this.moveToPage(this.state.currentPage != Math.ceil(this.props.data.length / this.state.perPage - 1)
								? this.state.currentPage + 1 : this.state.currentPage)}></div>
					</div>}
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
	getAllCampaigns: () => dispatch(campaignActions.getAllCampaigns())
});

export default connect(mapStateToProps, mapDispatchToProps)(CampaignCard);

