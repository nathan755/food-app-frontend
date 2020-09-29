import React, { Component } from "react";
import MenuBox from "./menu-selection";
import CreateUserPopup from "./popups/create-user";
import InviteUsersPopup from "./popups/invite-users";


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
        this.closePopup = this.closePopup.bind(this);
    }

    sendInvites(){

    }

    addUser(){

    }

    onCreateUserMenuClick(){
        this.setState({createUserPopupOpen:true});
    }

    onInviteUserMenuClick(){
        this.setState({inviteUserPopupOpen:true});
    }

    closePopup(){
        this.setState({
            createUserPopupOpen:false,
            inviteUserPopupOpen:false
        })
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
                {this.state.createUserPopupOpen && <CreateUserPopup close={this.closePopup} />}
                {this.state.inviteUserPopupOpen && <InviteUsersPopup close={this.closePopup} />}

                
                
            </div>
        )
    }

}

export default ManageUsers;