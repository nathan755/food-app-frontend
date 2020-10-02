import React, { Component } from "react";
import MenuBox from "./menu-selection";
import {setPopup, removePopup} from "../redux/actions/popup";
import {connect} from "react-redux";
import Table from "./table";
import Axios from "axios";
import {setNotification} from "../redux/actions/notification";

class ManageUsers extends Component {
    constructor(props){
        super(props)
        
        this.state = {
            createUserPopupOpen:false,
            inviteUserPopupOpen:false,
            selectedRow:{},
            tableConfig:{},
            loading:true,
            users:[],
            confirmDeletePopupVisible:false
        }

        this.onCreateUserMenuClick = this.onCreateUserMenuClick.bind(this);
        this.onInviteUserMenuClick = this.onInviteUserMenuClick.bind(this);
        this.closePopup = this.closePopup.bind(this);
        this.renderTable = this.renderTable.bind(this);
        this.onDeleteUserClick = this.onDeleteUserClick.bind(this);
        this.onUpdateUserClick = this.onUpdateUserClick.bind(this);


    }

    async componentDidMount(){
        try {
            const userPromise = await Axios.get("http://127.0.0.1:3001/account-users?account=24");
            const users = userPromise.data;
            let rows = [];
            users.forEach((user, index)=>{
                const values = [
                    user.first_name,
                    user.last_name,
                    user.email,
                    user.role,
                    "button"
                ];
                const data = {
                    firstName:user.first_name,
                    lastName:user.last_name,
                    email:user.email,
                    role:user.role
                };
                const buttons = [
                    {
                        dataKey:index,
                        value:"DELETE",
                        onClick:this.onDeleteUserClick,
                        loading:false,
                        disabled:false,
                        style:"danger"
                    },
                    {
                        dataKey:index,
                        value:"UPDATE",
                        onClick:this.onUpdateUserClick,
                        loading:false,
                        disabled:false,
                        style:"warning"
                    }
                ];
                
                rows.push({
                    id:index,
                    values,
                    data,
                    buttons
                });
            });
            const tableConfig = {
                title:"Users",
                header:[
                    "First Name",
                    "Last Name",
                    "Email",
                    "Role",
                    "Action"
                ],
                rows:rows
            }
            this.setState({ tableConfig, loading:false });
        } catch (error) {
            console.log("error",error);
            const notificationConfig = {
                title:"Error Fetching Users",
                copy:"A network error occured whilst fetching users",
                type:"danger",
                displayTime:3000
            }
            this.props.setNotification(notificationConfig);
        }
    }
    
    async onDeleteUserClick(event){
        //  make a GET request to confirm delete -> if always delete is selected true/1 do not show popup and just delete user
        //  if confirm delete is false / 0 -> show popup and allow pop up to take over.
        const selectedId = event.currentTarget.getAttribute("data-key");
        const selectedData = this.state.tableConfig.rows.find(item => parseInt(item.id) === parseInt(selectedId) );
        this.setState({selectedData:selectedData.data});
        try {
            const confirmDelete = await Axios.get(`http://127.0.0.1:3001/confirm-delete?accountId=${this.props.accountId}`);
            if(confirmDelete.data.confirm_delete === 0){
                // delete user
                const deleteUser = await Axios.delete(`http://127.0.0.1:3001/delete-user?userId=${selectedData.data.id}`);
                if(deleteUser.status === 200){
                    const successDeleteConfig = {
                        title:"User Deleted!",
                        copy:selectedData.data.firstName+" "+selectedData.data.lastName+" "+"has been deleted from your account!",
                        type:"success",
                        displayTime:3000
                    }
                    this.props.setNotification(successDeleteConfig);
                }
            }
            else{
                // show popup and allow pop up to take over. 
                this.setState({confirmDeletePopupVisible:true});
            }
        } 
        catch (error) {
            const failNotificationConfig = {
                title:"Error Deleting User",
                copy:"A network error occured! Unable to delete user",
                type:"danger",
                displayTime:3000
            }
            this.props.setNotification(failNotificationConfig);
        }
    }

    onUpdateUserClick(event){
        const selectedId = event.currentTarget.getAttribute("data-key");
        const selectedData = this.state.tableConfig.rows.find(item => parseInt(item.id) === parseInt(selectedId) );
        this.setState({selectedData:selectedData.data});

    }
    
    onCreateUserMenuClick(){
        this.setState({createUserPopupOpen:true});
        this.props.setPopup("create-user");
    }

    onInviteUserMenuClick(){
        this.setState({inviteUserPopupOpen:true});
        this.props.setPopup("invite-users")
    }

    closePopup(){
        this.setState({
            createUserPopupOpen:false,
            inviteUserPopupOpen:false
        })
    }

    renderTable(){
        if(!this.state.loading){
            return(<Table config={this.state.tableConfig} />);
        }
        return null;
    }


    render(){
        
        return(
            <div className="manage-users">
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
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        accountId:state.account.accountId
    }
}

const mapDispatchToProps = (dispatch)=>{
    return{
        setPopup:(type)=>{dispatch(setPopup(type))},
        removePopup:()=>{dispatch(removePopup())},
        setNotification:(config)=>{dispatch(setNotification(config))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageUsers);