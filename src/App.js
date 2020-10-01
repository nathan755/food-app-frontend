import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";
import Login from "./views/login";
import SignUp from "./views/sign-up";
import "./sass/core.scss";
import Dashboard from './views/dashboard';
import Axios from "axios";
import {connect} from "react-redux";
import { logout } from './redux/actions/account';
import { setAccount } from "./redux/actions/account";

class App extends Component {
	//	Fix auth later -> 
	//	https://solidgeargroup.com/refresh-token-autenticacion-jwt-implementacion-nodejs
	//	Store JTW where ? lol
	componentDidMount(){
		// const token = localStorage.getItem(token);
		// console.log("token",token)
		
		if(localStorage.getItem("token")===null){
			console.log("narp")
		}
		else{
			console.log("yarp")
			const token = localStorage.getItem("token")
			const config  = {
				headers:{"Authorization": `Bearer ${token}`
			}
		}
		Axios.post("http://127.0.0.1:3001/check-login",{}, config)
				.then((res)=>{
			console.log("res",res)
		})
		.catch((err)=>{
			console.log("err",err)
			// if 401:
				// set redux notification
				// remove token? 
				// set redux to logged out ect?
		})
	}
		
	

		
		

	}

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

const mapDispatchToProps = (dispatch) => {
	return{
		logout:()=>{dispatch(logout())},
		setAccount:()=>{dispatch(setAccount())}	
	}
} 

export default connect(null, mapDispatchToProps)(App);
