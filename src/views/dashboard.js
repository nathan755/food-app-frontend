import React, { Component } from "react";
import SideNav from "../components/side-navigation";
import {Link, Redirect, Switch, Route} from "react-router-dom";
import AccountManagement from "../components/account-managment";
import Reports from "../components/reports";

class Dashboard extends Component {
    constructor(props){
        super(props)

        this.renderSideNav = this.renderSideNav.bind(this);
    }
    

    renderSideNav(){
        // in future the config will be different for different users.
        // ie account level users will have access to accoutn management etc. 
        // employee level users will only have acess to tasks ect

        const config = [
            {
                copy:"Manage Account",
                route:"/dashboard/account-management"
            },
            {
                copy:"Reports",
                route:"/dashboard/reports"
            }
        ]

        return( <SideNav config={config}  />)

    }


    render(){
        return(
            <div className="dashboard">
                <div className="dashboard__side-nav">
                    <this.renderSideNav />
                </div>
                <div className="dashboard__content">
                <Switch >
					<Route exact path="/dashboard/account-management" component={AccountManagement} />
                    <Route exact path="/dashboard/reports" component={Reports} />
					

				</Switch>
             
                </div>
               
            </div>
        )
    }
}

export default Dashboard;