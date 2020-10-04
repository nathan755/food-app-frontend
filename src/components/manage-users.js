import React, { Component } from "react";
import MenuBox from "./menu-selection";
import { setPopup, removePopup } from "../redux/actions/popup";
import { connect } from "react-redux";
import Table from "./table";
import Axios from "axios";
import { setNotification } from "../redux/actions/notification";
import AreYouSure from "./popups/are-you-sure";

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
			confirmDeletePopupVisible: false
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
	
	async componentDidMount() {
		
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
			this.setState({ tableConfig, loading: false });
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
		const selectedId = event.currentTarget.getAttribute("data-key");
		const selectedData = this.state.tableConfig.rows.find(item => parseInt(item.id) === parseInt(selectedId));
		this.setState({ selectedData: selectedData.data }, async () => {
			try {
				const confirmDelete = await Axios.get(`http://127.0.0.1:3001/confirm-delete?accountId=${this.props.accountId}`);
				if (confirmDelete.data.confirm_delete === 0) {
					this.deleteUser(this.state.selectedData);
				}
				else {
					document.getElementsByClassName("dashboard__side-nav")[0].className += " blur";
					this.setState({ confirmDeletePopupVisible: true });
				}
			}
			catch (error) {
				console.log("error", error)
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

	onConfirmDeleteYesClick() {
		this.deleteUser(this.state.selectedData);
	}

	async deleteUser(selectedData) {
		try {
			const deleteUser = await Axios.delete(`http://127.0.0.1:3001/delete-user?userId=${selectedData.id}`);
			console.log("deleteUser",deleteUser)
			if (deleteUser.status === 200) {
				const successDeleteConfig = {
					title: "User Deleted!",
					copy: selectedData.firstName + " " + selectedData.lastName + " " + "has been deleted from your account!",
					type: "success",
					displayTime: 3000
				}
				this.props.setNotification(successDeleteConfig);
				const sideNav = document.getElementsByClassName("dashboard__side-nav")[0];
				sideNav.classList.remove("blur");
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

	onConfirmDeleteNoClick() {
		const sideNav = document.getElementsByClassName("dashboard__side-nav")[0];
		sideNav.classList.remove("blur");
		this.setState({ confirmDeletePopupVisible: false })
	}

	onUpdateUserClick(event) {
		const selectedId = event.currentTarget.getAttribute("data-key");
		const selectedData = this.state.tableConfig.rows.find(item => parseInt(item.id) === parseInt(selectedId));
		this.props.setPopup("create-user", selectedData.data);
		this.setState({ selectedData: selectedData.data });
	}

	onCreateUserMenuClick() {
		this.setState({ createUserPopupOpen: true });
		this.props.setPopup("create-user");
	}

	onInviteUserMenuClick() {
		this.setState({ inviteUserPopupOpen: true });
		this.props.setPopup("invite-users");
	}

	closePopup() {
		this.setState({
			createUserPopupOpen: false,
			inviteUserPopupOpen: false
		});
	}

	renderTable() {
		if (!this.state.loading) {
			return (<Table config={this.state.tableConfig} />);
		}
		return null;
	}


	render() {
		return (
			<div className={`manage-users ${this.state.confirmDeletePopupVisible ?"blur":""}`}>
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
				
					{this.state.confirmDeletePopupVisible && <AreYouSure onNoClick={this.onConfirmDeleteNoClick} onYesClick={this.onConfirmDeleteYesClick} />}
				
				
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