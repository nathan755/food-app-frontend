import React, { Component } from "react";
import MenuBox from "./menu-selection";
import { setPopup, removePopup } from "../redux/actions/popup";
import { connect } from "react-redux";
import Table from "./table";
import Axios from "axios";
import { setNotification } from "../redux/actions/notification";
import AreYouSure from "./popups/are-you-sure";
import CreateUser from "./popups/create-user";

class ManageUsers extends Component {
	constructor(props) {
		super(props)
		
		this.state = {
			createUserPopupOpen: false,
			inviteUserPopupOpen: false,
			selectedRow: {},
			tableConfig: {},
			loading: true,
			users: [],
			confirmDeletePopupVisible: false,
			editUserPopupType:""
		}
		
		this.onCreateUserMenuClick = this.onCreateUserMenuClick.bind(this);
		this.onInviteUserMenuClick = this.onInviteUserMenuClick.bind(this);
		this.closePopup = this.closePopup.bind(this);
		this.renderTable = this.renderTable.bind(this);
		this.onDeleteUserClick = this.onDeleteUserClick.bind(this);
		this.onUpdateUserClick = this.onUpdateUserClick.bind(this);
		this.onConfirmDeleteNoClick = this.onConfirmDeleteNoClick.bind(this);
		this.onConfirmDeleteYesClick = this.onConfirmDeleteYesClick.bind(this);
		
	}
	
	componentDidMount() {
		this.fetchTabledata();
	}
	
	// -----------> Fetch data functions <-----------
	async deleteUser(selectedData) {
		try {
			const deleteUser = await Axios.delete(`http://127.0.0.1:3001/delete-user?userId=${selectedData.id}`);
			if (deleteUser.status === 200) {
				const successDeleteConfig = {
					title: "User Deleted!",
					copy: selectedData.firstName + " " + selectedData.lastName + " " + "has been deleted from your account!",
					type: "success",
					displayTime: 3000
				}
				// fetch updated data
				this.fetchTabledata();
				this.props.setNotification(successDeleteConfig);
				// const sideNav = document.getElementsByClassName("dashboard__side-nav")[0];
				// sideNav.classList.remove("blur");
				this.handleBlur("remove")
				this.setState({ confirmDeletePopupVisible: false });
			}
		}
		catch (error) {
			const failNotificationConfig = {
				title: "Error Deleting User",
				copy: "A network error occured! Unable to delete user",
				type: "danger",
				displayTime: 3000
			}
			this.props.setNotification(failNotificationConfig);
		}
	}
	
	async fetchTabledata(){
		// fetch table data
		try {
			const userPromise = await Axios.get(`http://127.0.0.1:3001/account-users?account=${this.props.accountId}`);
			const users = userPromise.data;
			let rows = [];
			users.forEach((user, index) => {
				const values = [
					user.first_name,
					user.last_name,
					user.email,
					user.role,
					"button"
				];
				const data = {
					firstName: user.first_name,
					lastName: user.last_name,
					email: user.email,
					role: user.role,
					id: user.id // look up if i should not use the actual id on the table 
				};
				const buttons = [
					{
						dataKey: index,
						value: "DELETE",
						onClick: this.onDeleteUserClick,
						loading: false,
						disabled: false,
						style: "danger"
					},
					{
						dataKey: index,
						value: "UPDATE",
						onClick: this.onUpdateUserClick,
						loading: false,
						disabled: false,
						style: "warning"
					}
				];
				rows.push({
					id: index,
					values,
					data,
					buttons
				});
			});
			const tableConfig = {
				title: "Users",
				header: [
					"First Name",
					"Last Name",
					"Email",
					"Role",
					"Action"
				],
				rows: rows
			}
			this.setState({ tableConfig, loading: false, rows });
		}
		catch (error) {
			const notificationConfig = {
				title: "Error Fetching Users",
				copy: "A network error occured whilst fetching users",
				type: "danger",
				displayTime: 3000
			}
			this.props.setNotification(notificationConfig);
		}
	}
	
	async onDeleteUserClick(event) {
		// delete buttons handler in table
		const selectedId = event.currentTarget.getAttribute("data-key");
		const selectedData = this.state.tableConfig.rows.find(item => parseInt(item.id) === parseInt(selectedId));
		this.setState({ selectedData: selectedData.data }, async () => {
			try {
				const confirmDelete = await Axios.get(`http://127.0.0.1:3001/confirm-delete?accountId=${this.props.accountId}`);
				if (confirmDelete.data.confirm_delete === 0) {
					this.deleteUser(this.state.selectedData);
				}
				else {
					this.handleBlur()
					this.setState({ confirmDeletePopupVisible: true });
				}
			}
			catch (error) {
				const failNotificationConfig = {
					title: "Error Deleting User",
					copy: "A network error occured! Unable to delete user",
					type: "danger",
					displayTime: 3000
				}
				this.props.setNotification(failNotificationConfig);
			}
		});
	}
	
	onEditUserPopupSubmit = () => {
		// fetch updated data close popup
		this.handleBlur("remove")
		this.fetchTabledata();
		this.setState({createUserPopupOpen:false});
	}

	// -----------> Click Handlers <-----------
	onConfirmDeleteYesClick() {
		// are you sure on yes click handler
		this.deleteUser(this.state.selectedData);
	}
	
	onConfirmDeleteNoClick() {
		// are you sure on no click handler
		this.handleBlur("remove");
		this.setState({ confirmDeletePopupVisible: false });
	}

	onUpdateUserClick(event) {
		// update buttons handler in table
		const selectedId = event.currentTarget.getAttribute("data-key");
		const selectedData = this.state.tableConfig.rows.find(item => parseInt(item.id) === parseInt(selectedId));
		this.handleBlur();
		this.setState({ selectedData: selectedData.data, userPopupType:"update-user", createUserPopupOpen:true });
	}
	
	// -----------> Popup handlers <-----------
	handleBlur = (type) => {
		if(type === "remove"){
			const dashboard = document.getElementsByClassName("manage-users")[0];
			const sideNav = document.getElementsByClassName("dashboard__side-nav")[0];
			sideNav.classList.remove("blur");
			dashboard.classList.remove("blur");
		}
		else{
			document.getElementsByClassName("dashboard__side-nav")[0].className += " blur";
			document.getElementsByClassName("manage-users")[0].className += " blur";
		}
	} 

	closePopup() {
		this.handleBlur("remove");
		this.setState({
			createUserPopupOpen: false,
			inviteUserPopupOpen: false
		});
	}

	onCreateUserMenuClick() {
		this.handleBlur()
		this.setState({ createUserPopupOpen: true, userPopupType:"create-user" });
	}
	
	onInviteUserMenuClick() {
		this.setState({ inviteUserPopupOpen: true });
	}
	
	// -----------> Render Functions <-----------
	renderTable() {
		if (!this.state.loading) {
			return (<Table config={this.state.tableConfig} />);
		}
		// add loading in future / sorry no data
		return null;
	}
	
	render() {
		return (
      <div
        className={`manage-users`}
      >
        <div className="manage-users__table">
          <h1>Manage Users</h1>
          <this.renderTable />
        </div>
        <div className="manage-users__buttons">
          <MenuBox
            icon={<i class="fas fa-user-plus"></i>}
            title="Create User"
            onClick={this.onCreateUserMenuClick}
          />
          <MenuBox
            icon={<i class="fas fa-envelope"></i>}
            title="Invite Users"
            onClick={this.onInviteUserMenuClick}
          />
        </div>
        {this.state.confirmDeletePopupVisible && (
          <AreYouSure
            onNoClick={this.onConfirmDeleteNoClick}
            onYesClick={this.onConfirmDeleteYesClick}
          />
        )}
        {this.state.createUserPopupOpen && (
          <CreateUser
            config={this.state.selectedData}
            type={this.state.userPopupType}
            closePopup={this.closePopup}
            onSubmit={this.onEditUserPopupSubmit}
          />
        )}
      </div>
    );
	}
}

const mapStateToProps = (state) => {
	return {
		accountId: state.account.accountId,
		app: state.app
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setPopup: (type, config) => { dispatch(setPopup(type, config)) },
		removePopup: () => { dispatch(removePopup()) },
		setNotification: (config) => { dispatch(setNotification(config)) }
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageUsers);