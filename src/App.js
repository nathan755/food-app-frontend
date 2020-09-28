import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";
import Login from "./views/login";
import SignUp from "./views/sign-up";
import "./sass/core.scss";
import Dashboard from './views/dashboard';

class App extends Component {
	render() {
		return (
			<Router>
				<Switch >
					<Route path="/login" component={Login} />
					<Route path="/sign-up" component={SignUp} />
					<Route path="/dashboard" component={Dashboard} />

				</Switch>
			</Router>
		)
	}
}

export default App;
