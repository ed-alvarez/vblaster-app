import './AudioFiles.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import campaignAudioFilesActions from '../../../../../../redux/actions/campaignAudioFiles.actions';

class AudioFiles extends Component {
	constructor() {
		super();

		this.state = {
			audioFile: '',
			file: null
		};

		this.handleAudioFileChange = this.handleAudioFileChange.bind(this);
		this.deleteAudioFile = this.deleteAudioFile.bind(this);
		this.FilesList = this.FilesList.bind(this);
	}

	componentDidMount() {
		this.props.getAllAudioFiles(this.props.campaignId);
	}

	handleAudioFileChange(e) {
		this.setState({
			audioFile: e.target.value.replace('C:\\fakepath\\', ''),
			file: e.target.files[0]
		}, () => {
			this.props.uploadAudioFile(this.props.campaignId, this.state.file);
		});
	}

	deleteAudioFile(fileId, fileName, fileType) {
		this.props.deleteAudioFile(this.props.campaignId, fileId, fileName, fileType);
	}

	FilesList() {
		if (!this.props.payload || !this.props.payload.audio_files) {
			return (
				<div className="no-files">
					This campaign has no audio files yet.
				</div>
			);
		}

		return (
			<div>
				<span className="title">Available Audio Files</span>
				<span className="description">
					Manage your audio files.
				</span>
				<div className="list">
					{this.props.payload.audio_files.map(data => (
						<div className="file-wrapper" key={data.file_id}>
							<div className="file">{data.file_name}</div>
							<div className="options">
								<button className="btn btn-danger" onClick={() => this.deleteAudioFile(data.file_id, data.file_name, data.file_type)}>
									<i className="fas fa-trash"></i> Delete
								</button>
							</div>
						</div>
					))}
				</div>
			</div>
		);
	}

	render() {
		const { loading, error } = this.props;

		if (loading)
			return <div></div>;

		return (
			<div className="audio-files">
				<div className="container">
					{error && <div className="c-alert danger">{error}</div>}
					<span className="title">
						<i className="far fa-file-audio"></i> Campaign Audio Files
					</span>
					<span className="description">
						Upload your audio files for your campaign here.
					</span>

					<div className="file-upload-container">
						<i className="far fa-folder-upload"></i>
						<span><b>Drag</b> &amp; <b>Drop</b></span>
						<span className="click-me">(or click me)</span>

						<div className=" upload-details">
							<div className="detail">
								<i className="far fa-exclamation-circle"></i> Only WAV and GSM files are allowed.
							</div>
							<div className="detail">
								<i className="far fa-exclamation-circle"></i> Audio frequency needs to be 8000 Hz.
							</div>
						</div>

						<div className="upload-details">
							<div className="detail">
								<i className="far fa-exclamation-circle"></i> Filename will be used as the identifier.
							</div>
							<div className="detail">
								<i className="far fa-exclamation-circle"></i> Maximum file size is 10MB.
							</div>
						</div>
						<input type="file" name="audioFile" onChange={this.handleAudioFileChange} />
						{this.state.audioFile && <span className="file-path">{this.state.audioFile.length >= 45
							? `${this.state.audioFile.slice(0, 45)}...`
							: this.state.audioFile}
						</span>}
					</div>

					<div className="files-list">
						<this.FilesList />
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	loading: state.campaignAudioFilesReducer.loading,
	payload: state.campaignAudioFilesReducer.payload,
	error: state.campaignAudioFilesReducer.error
});

const mapDispatchToProps = dispatch => ({
	getAllAudioFiles: campaignId => dispatch(campaignAudioFilesActions.getAllAudioFiles(campaignId)),
	uploadAudioFile: (campaignId, file) => dispatch(campaignAudioFilesActions.uploadAudioFile(campaignId, file)),
	deleteAudioFile: (campaignId, fileId, fileName, fileType) => dispatch(campaignAudioFilesActions.deleteAudioFile(campaignId, fileId, fileName, fileType))
});

export default connect(mapStateToProps, mapDispatchToProps)(AudioFiles);
