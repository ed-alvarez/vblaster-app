import './TopBar.scss';

import classNames from 'classnames';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import userActions from '../../../../redux/actions/user.actions';

class TopBar extends Component {
	_isMounted = false;

	constructor() {
		super();

		this.state = {
			userMenuToggle: false
		};

		this.showMenu = this.showMenu.bind(this);
		this.closeMenu = this.closeMenu.bind(this);
	}

	componentDidMount() {
		this._isMounted = true;

		if (this._isMounted)
			this.props.getUser();
	}

	componentWillUnmount() {
		this._isMounted = false;
		document.removeEventListener('click', this.closeMenu);
	}

	showMenu(e) {
		e.preventDefault();

		if (this._isMounted) {
			this.setState({ userMenuToggle: true }, () =>
				document.addEventListener('click', this.closeMenu));
		}
	}

	closeMenu(e) {
		e.preventDefault();

		if (this._isMounted) {
			this.setState({ userMenuToggle: false }, () =>
				document.removeEventListener('click', this.closeMenu));
		}
	}

	render() {
		const { loading, payload } = this.props;

		if (loading)
			return <div></div>;

		return (
			<div className="topbar">
				<div className="container">
					<div className="row">
						<div className="col-lg-6 col-md-6 col-3">
							<div className="logo" onClick={() => this.props.history.push('/dashboard')}></div>
						</div>
						{payload && <div className="col-lg-6 col-md-6 col-9">
							<div className="right-menu">
								<div className="user-menu-toggle">
									<i className="far fa-bars"></i>
								</div>
								<div className="user-menu">
									<div className="btn btn-add">
										Create <i className="fas fa-plus"></i>
									</div>
									<div className="divider"></div>
									<div className="user-dropdown"
										onClick={this.showMenu}>
										<span className="username">
											{payload.username}
										</span>
										<i className={classNames(`far`, {
											'fa-angle-up': this.state.userMenuToggle,
											'fa-angle-down': !this.state.userMenuToggle
										})}></i>
									</div>
									<div ref={el => {
										this.dropdownMenu = el
									}} className={classNames('topbar-dropdown', {
										toggled: this.state.userMenuToggle
									})}>
										<div className="item">
											<span>Settings</span>
											<i className="far fa-cog"></i>
										</div>
										<div className="item" onClick={() => this.props.history.push('/logout')}>
											<span>Log out</span>
											<i className="far fa-power-off"></i>
										</div>
									</div>
								</div>
							</div>
						</div>}
					</div>
				</div>
			</div >
		);
	}
}

const mapStateToProps = state => ({
	loading: state.userReducer.loading,
	payload: state.userReducer.payload,
	error: state.userReducer.error
});

const mapDispatchToProps = dispatch => ({
	getUser: () => dispatch(userActions.getUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TopBar));
