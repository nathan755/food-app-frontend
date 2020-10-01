import React, { Component } from "react";
import SideNav from "../components/side-navigation";
import {Link, Redirect, Switch, Route} from "react-router-dom";
import AccountManagement from "../components/account-managment";
import Reports from "../components/reports";
import ManageUsers from "../components/manage-users";
import {connect} from "react-redux";
import Popup from "../components/popups";
import Notification from "../components/notification";
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
        console.log("this.props", this.props)
        return(
            <div className="dashboard">
                <div className={`dashboard__side-nav ${this.props.popup.popupVisible===true?"blur":""}`}>
                    <this.renderSideNav />
                </div>
                <div className={`dashboard__content ${this.props.popup.popupVisible===true ?"blur":""} `}>
                    <Switch >
                        <Route exact path="/dashboard/account-management" component={AccountManagement} />
                        <Route exact path="/dashboard/reports" component={Reports} />
                        <Route exact path="/dashboard/manage-users" component={ManageUsers} />
                    </Switch>
                </div>
                <Popup />
                <Notification displayTime={5000} title="Test Notification" type="danger" copy="this is some test copy for a test notification.....!"  />

            </div>
        );
    }
}

const mapStateToProps = (state) =>{
    return{
        popup:state.popup
    }
}

export default connect(mapStateToProps)(Dashboard);