import React, { Component } from "react";
import SideNav from "../components/side-navigation";
import {Link, Redirect, Switch} from "react-router-dom";
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
                route:"/account-management"
            },
            {
                copy:"Reports",
                route:"/reports"
            }
        ]

        return( <SideNav config={config}  />)

    }


    render(){
        return(
            <div className="dashboard">
                <this.renderSideNav />
                <div>
                    {/* put switch here? */}
             
                </div>
               
            </div>
        )
    }
}

export default Dashboard;