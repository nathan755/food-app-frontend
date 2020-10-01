import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Login from "./views/login";
import SignUp from "./views/sign-up";
import "./sass/core.scss";
import Dashboard from './views/dashboard';
import Axios from "axios";
import { connect } from "react-redux";
import { logout } from './redux/actions/account';
import { setAccount } from "./redux/actions/account";
import { setNotification } from './redux/actions/notification';
import Notification from "./components/notification";

class App extends Component {
	//	!!!!! <- Fix auth later -> !!!!!!
	//	https://solidgeargroup.com/refresh-token-autenticacion-jwt-implementacion-nodejs hmm
	//	Store JTW where ? lol
	constructor(props) {
		super(props)
		this.state = {
			redirect: false
		}
	}
	
	componentDidMount() {
		if (localStorage.getItem("token") === null) {
			console.log("narp")
		}
		else {
			console.log("yarp")
			const token = localStorage.getItem("token")
			const config = {
				headers: {
					"Authorization": `Bearer ${token}`
				}
			}
			Axios.post("http://127.0.0.1:3001/check-login", {}, config)
				.then((res) => {
					this.props.setAccount(res.data);
				})
				.catch((err) => {
					console.log("err", err)
					const notificationConfig = {
						title: "We need to see youridentification",
						copy: "whhooo slow down mate",
						type: "danger",
						displayTime: 3000,
					}
					this.props.setNotification(notificationConfig);
					this.setState({
						redirect: true
					});
				});
		}
	}

	render() {
		return (
			<Router>
				{this.state.redirect && <Redirect to="/login" />}
				<Switch >
					<Route path="/login" component={Login} />
					<Route path="/sign-up" component={SignUp} />
					<Route path="/dashboard" component={Dashboard} />

				</Switch>
				{
					(this.props.notification.notificationVisible) &&
					<Notification
						displayTime={this.props.notification.displayTime}
						type={this.props.notification.type}
						title={this.props.notification.title}
						copy={this.props.notification.copy}
					/>
				}
			</Router>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		logout: () => { dispatch(logout()) },
		setAccount: (data) => { dispatch(setAccount(data)) },
		setNotification: (config) => { dispatch(setNotification(config)) }
	}
}

const mapStateToProps = (state) => {
	return {
		notification: state.notification
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
