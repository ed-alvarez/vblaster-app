import './Auth.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import userActions from '../../redux/actions/user.actions';

class Auth extends Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event) {
		event.preventDefault();

		const data = new FormData(event.target);
		this.props.login(data.get('username'), data.get('password'));
	}

	render() {
		const { loading, error } = this.props;

		return (
			<div className="container-fluid login">
				<div className="row d-flex justify-content-center">
					<div className="col-lg-6 col-sm-12">
						<div className="login-content">
							<div className="logo"></div>
							{error && <div className="c-alert danger">
								<i className="fas fa-exclamation-triangle"></i> {error}
							</div>}
							<div className="c-form">
								<form onSubmit={this.handleSubmit}>
									<div className="links-container">
										<a href="#" className="login-link">Log in</a>
									</div>

									<div className="w-input">
										<input name="username" type="text"
											className="c-input" placeholder="Username" required />
									</div>

									<div className="w-input">
										<input name="password" type="password"
											className="c-input" placeholder="Password" required />
									</div>

									<a href="#" className="forgotten-password">
										Don&apos;t remember your password?
									</a>

									<button className="btn btn-success" disabled={loading}>
										Log in <i className={`fas ${loading ? 'fa-circle-notch fa-spin' : 'fa-arrow-right'}`}></i>
									</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	loading: state.userReducer.loading,
	payload: state.userReducer.payload,
	error: state.userReducer.error
});

const mapDispatchToProps = dispatch => ({
	login: (username, password) => dispatch(userActions.login(username, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
