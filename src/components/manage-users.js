import React, { Component } from "react";
import MenuBox from "./menu-selection";
class ManageUsers extends Component {
    constructor(props){
        super(props)

        this.state = {
            createUserPopupOpen:false,
            inviteUserPopupOpen:false
        }

        this.onCreateUserClick = this.onCreateUserClick.bind(this);
        this.onInviteUserClick = this.onInviteUserClick.bind(this);
        
    }

    onCreateUserClick(){
        console.log("click")
    }

    onInviteUserClick(){
        console.log("invite")
    }

    render(){
        return(
            <div className="manage-users">
                <h1>Manage Users</h1>
                <MenuBox
                    icon={<i class="fas fa-user-plus"></i>}
                    title="Create User"
                    onClick={this.onCreateUserClick}
                 />
                 <MenuBox
                    icon={<i class="fas fa-envelope"></i>}
                    title="Invite Users"
                    onClick={this.onInviteUserClick}
                 />
            </div>
        )
    }

}

export default ManageUsers;