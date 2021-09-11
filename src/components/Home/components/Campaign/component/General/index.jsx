import './General.scss';

import classNames from 'classnames';
import InlineEdit from 'react-edit-inline2';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import React, { Component } from 'react';

import campaignActions from '../../../../../../redux/actions/campaign.actions';

class General extends Component {
	constructor() {
		super();

		this.state = {
			campaignName: '',
			campaignDescription: '',
			trunk: '',
			extOrQueue: '',
			prefix: '',
			callerId: '',
			audioFile: '',
			campaignStatus: false
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.updateCampaignStatus = this.updateCampaignStatus.bind(this);
		this.saveCampaign = this.saveCampaign.bind(this);
		this.resetSettings = this.resetSettings.bind(this);
		this.CampaignStatusButton = this.CampaignStatusButton.bind(this);
	}

	componentDidMount() {
		this.props.getCampaign(this.props.campaignId);
	}

	customValidateText(text) {
		return (text.length > 0 && text.length < 64);
	}

	customValidateDesc(text) {
		return (text.length > 0 && text.length < 120);
	}

	handleInputChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	updateCampaignStatus(status) {
		switch (status) {
			case 0:
				this.setState({
					campaignStatus: 1
				}, () => {
					this.props.updateCampaignStatus(this.props.payload.campaign_id, 1);
				});
				break;
			case 1:
				this.setState({
					campaignStatus: 0
				}, () => {
					this.props.updateCampaignStatus(this.props.payload.campaign_id, 0);
				});
				break;
			case 2:
				this.props.resetCampaign(this.props.payload.campaign_id);
				break;
		}
	}

	CampaignStatusButton() {
		const btnStatusNames = ['Start campaign', 'Stop campaign', 'Reset campaign'];

		return (
			<button className={`btn ${classNames({
				'btn-success': this.props.payload.status == 0,
				'btn-danger': this.props.payload.status == 1,
				'btn-redo': this.props.payload.status == 2
			})}`} onClick={() => this.updateCampaignStatus(this.props.payload.status)}>
				<i className={`fas ${classNames({
					'fa-play': this.props.payload.status == 0,
					'fa-times': this.props.payload.status == 1,
					'fa-redo-alt': this.props.payload.status == 2
				})}`}></i> {btnStatusNames[this.props.payload.status]}
			</button>
		)
	}

	saveCampaign() {
		this.props.updateCampaign(this.props.payload.campaign_id, {
			campaign_name: this.state.campaignName || this.props.payload.campaign_name,
			campaign_description: this.state.campaignDescription || this.props.payload.campaign_description,
			trunk: this.state.trunk || this.props.payload.trunk,
			ext_or_queue: this.state.extOrQueue || this.props.payload.ext_or_queue,
			prefix: this.state.prefix || this.props.payload.prefix,
			caller_id: this.state.callerId || this.props.payload.caller_id,
			audio_file: this.state.audioFile || this.props.payload.audio_file
		});
	}

	resetSettings() {
		window.location.reload();
	}

	render() {
		const { loading, payload, error } = this.props;

		if (error)
			return <div className="c-alert danger">{error}</div>;

		if (loading)
			return <div></div>;

		if (!payload.campaign_name)
			return <div></div>;

		return (
			<div className="general">
				<div className="row">
					<div className="col-lg-6">
						<InlineEdit
							activeClassName="campaign-name-input"
							className="campaign-name"
							validate={this.customValidateText}
							paramName="campaignName"
							change={this.handleInputInline}
							text={payload.campaign_name} />
						<InlineEdit
							activeClassName="campaign-description-input"
							className="campaign-description"
							validate={this.customValidateDesc}
							paramName="campaignDescription"
							change={this.handleInputInline}
							text={payload.campaign_description} />
					</div>
					<div className="col-lg-6 right-container">
						<div className="campaign-status">
							<span>Status:</span>
							<div className={`status ${classNames({
								'status-stopped': payload.status === 0,
								'status-running': payload.status === 1,
								'status-completed': payload.status === 2
							})}`}></div>
							<span className="id">{payload.campaign_id}</span>
							<this.CampaignStatusButton />
						</div>
					</div>
				</div>

				<div className="campaign-details-container">
					<div className="control-wrap">
						<label>Trunk</label>
						<input name="trunk" placeholder={payload.trunk}
							onChange={this.handleInputChange}
							value={this.state.trunk} required />
					</div>
					<div className="control-wrap">
						<label>Extension or Queue</label>
						<input name="extOrQueue" placeholder={payload.ext_or_queue}
							onChange={this.handleInputChange}
							value={this.state.extOrQueue} required />
					</div>
					<div className="control-wrap">
						<label>Prefix &amp; Caller ID</label>
						<div className="prefix-caller-id">
							<input type="number" name="prefix" className="prefix" placeholder={payload.prefix}
								onChange={this.handleInputChange} required />
							<input type="number" name="callerId" className="caller-id" placeholder={payload.caller_id}
								onChange={this.handleInputChange} required />
						</div>
					</div>
					<div className="control-wrap">
						<label>Audio File</label>
						<select name="audioFile" value={this.state.audioFile || this.props.payload.audio_file} onChange={this.handleInputChange}>
							<option value="none">None</option>
							{this.props.payload.available_audio_files.map(data => (
								<option value={data.file_name} key={data.file_id} >{data.file_name}</option>
							))}
						</select>
					</div>
					<div className="control-wrap btn-wrap">
						<button className="btn btn-success" onClick={this.saveCampaign}>
							<i className="fas fa-save"></i> Save Changes
						</button>
						<button className="btn btn-danger" onClick={this.resetSettings}>Reset</button>
					</div>
				</div>
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
	getCampaign: campaignId => dispatch(campaignActions.getCampaign(campaignId)),
	updateCampaignStatus: (campaignId, status) => dispatch(campaignActions.updateCampaignStatus(campaignId, status)),
	updateCampaign: (campaignId, payload) => dispatch(campaignActions.updateCampaign(campaignId, payload)),
	resetCampaign: campaignId => dispatch(campaignActions.resetCampaign(campaignId))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(General));
