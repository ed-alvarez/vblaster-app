import './index.scss';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

import React from 'react';
import ReactDOM from 'react-dom';

import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router'
import { Provider } from 'react-redux';

import store, { history } from './redux/store';

import ProtectedRoute from './components/ProtectedRoute';

import Home from './components/Home';
import Auth from './components/Auth';
import NotFound from './components/NotFound';
import Logout from './components/Logout';

const App = () => (
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<Switch>
				<Route exact path="/" component={Auth} />
				<ProtectedRoute path="/dashboard" comp={Home} />
				<Route path="/logout" component={Logout} />
				<Route component={NotFound} />
			</Switch>
		</ConnectedRouter>
	</Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));
