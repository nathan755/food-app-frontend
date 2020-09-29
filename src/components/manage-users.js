import React, { Component } from "react";
import MenuBox from "./menu-selection";
import CreateUserPopup from "./popups/create-user";

class ManageUsers extends Component {
    constructor(props){
        super(props)

        this.state = {
            createUserPopupOpen:false,
            inviteUserPopupOpen:false
        }

        this.onCreateUserMenuClick = this.onCreateUserMenuClick.bind(this);
        this.onInviteUserMenuClick = this.onInviteUserMenuClick.bind(this);
        this.sendInvites = this.sendInvites.bind(this);
        this.addUser = this.addUser.bind(this);
    }

    sendInvites(){

    }

    addUser(){

    }

    onCreateUserMenuClick(){
        console.log("click")
    }

    onInviteUserMenuClick(){
        console.log("invite")
    }

    render(){
        return(
            <div className="manage-users">
                <div className="manage-users__table">
                    <h1>Manage Users</h1>
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
                <CreateUserPopup />
            </div>
        )
    }

}

export default ManageUsers;