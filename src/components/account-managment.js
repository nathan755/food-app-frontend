import React, { Component } from "react";
import MenuBox from "./menu-selection";
import {Link} from "react-router-dom";

class AccountManagement extends Component {
	constructor(props){
		super(props)
	}
	render(){
		return(
			<div className="account-management">
				<h1>Account Management</h1>
				<div className="account-management__links">
					<div>
						<Link to="/dashboard/manage-users">
							<MenuBox
								useAsLink={true}
								title="Manage Users"
								icon={<i class="fas fa-users-cog"></i>}
							/>
						</Link>
						<Link to="/dashboard/manage-payments">
							<MenuBox
								useAsLink={true}
								title="Manage Payments"
								icon={<i class="fas fa-wallet"></i>}
							/>
						</Link>
					</div>
					<div>
						<Link to="/dashboard/manage-account">
							<MenuBox
								useAsLink={true}
								title="Manage Account"
								icon={<i class="fas fa-info-circle"></i>}
							/>
						</Link>
						<Link to="/dashboard/help">
							<MenuBox
								useAsLink={true}
								title="Help"
								icon={<i class="far fa-question-circle"></i>}
							/>
						</Link>
					</div>
				</div>
			</div>
		);
	}
}

export default AccountManagement;