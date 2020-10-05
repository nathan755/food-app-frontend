import React, { Component } from "react";
import TextFormField from "../text-field";
import Button from "../button";
import MenuBox from "../menu-selection";
import Axios from "axios";

class InviteUsersPopup extends Component {
    constructor(props){
        super(props)

        this.state = {
            email:"",
            role:"",
            emailErrorMessage:"",
            roleErrorMessage:""
        }
    }

    onInviteClick = () => {}

    onCancelClick = () => {
        console.log("cancel click")
        this.props.closePopup();
    }

    onEmailChange = (event) => {
        this.setState({email:event.target.value});
    }

    onRoleClick = (event, type) => {
        if (type === "manager") {
            this.setState({ role: this.state.role === "manager" ? "" : "manager" });
        }
        if (type === "employee") {
            this.setState({ role: this.state.role === "employee" ? "" : "employee" });
        }
    }

    validateFields = () => {
        let valid = true;
        let emailErrorMessage ="";
        let roleErrorMessage = "";
        if(this.state.role === ""){
            valid = false;
            roleErrorMessage="field required";
        }
        if(emailErrorMessage===""){
            valid = false;
            emailErrorMessage = "field required";
        }
        this.setState({
            emailErrorMessage,
            roleErrorMessage
        });
        return valid
    }
    
    render(){
        return(
            <div className="invite-users-popup popup">
                <h1>Invite users</h1>
                <TextFormField errorMessage={this.state.emailErrorMessage} dataKey="email" onChange={this.onEmailChange} label="Email" />
                <label >Role</label>
                <div className="roles">
                    <MenuBox title="Employee" icon={<i class="fas fa-people-carry"></i>} dataName="employee" onClick={this.onRoleClick} size="small" />
                    <MenuBox title="Manager" icon={<i class="fas fa-tasks"></i>} dataName="manager" onClick={this.onRoleClick} size="small" />
                </div>


                <Button onClick={this.onCancelClick} value="Cancel" />
                <Button onClick={this.onInviteClick} value="Invite" />
            </div>
        )
    }
}

export default InviteUsersPopup;