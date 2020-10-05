import React, { Component } from "react";
import TextFormField from "../text-field";
import Button from "../button";
import MenuBox from "../menu-selection";
import Axios from "axios";
import {connect} from "react-redux";
import {setNotification} from "../../redux/actions/notification";

class InviteUsersPopup extends Component {
    constructor(props){
        super(props)

        this.state = {
            email:"",
            role:"",
            emailErrorMessage:"",
            roleErrorMessage:""
        }

        this.onInviteClick = this.onInviteClick.bind(this);
    }

    async onInviteClick(){
        // !! this takes a while -deffo need some sort of loading animation
        // hwo to add exiry to link?
        if (this.validateFields() === true) {
            try {
                await Axios.post("http://127.0.0.1:3001/invite", {
                    email: this.state.email,
                    accountId: this.props.account.accountId
                });
                const successNotificationConfig = {
                    title: "Invite Sent",
                    copy: `An invite was successfully sent to  ${this.state.email}`,
                    type: "success",
                    displayTime: 3000
                }
                this.props.setNotification(successNotificationConfig);
                this.props.closePopup();

            }
            catch (error) {
                const failNotificationConfig = {
                    title: "Error Sending Invite",
                    copy: "An error occured whilst sending invite",
                    type: "danger",
                    displayTime: 3000
                }
                this.props.setNotification(failNotificationConfig);
            }
        }
    }

    onCancelClick = () => {
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
        let emailErrorMessage = "";
        let roleErrorMessage = "";
        if(this.state.role === ""){
            valid = false;
            roleErrorMessage="field required";
        }
        if(this.state.email===""){
            valid = false;
            emailErrorMessage = "field required";
        }
        this.setState({
            emailErrorMessage,
            roleErrorMessage
        });
        return valid;
    }
    
    render(){
        return (
          <div className="invite-users-popup popup">
            <h1>Invite users</h1>
            <TextFormField
              errorMessage={this.state.emailErrorMessage}
              dataKey="email"
              onChange={this.onEmailChange}
              label="Email"
            />
            <label>Role</label>
            <div className="roles">
              <MenuBox
                title="Employee"
                icon={<i class="fas fa-people-carry"></i>}
                dataName="employee"
                onClick={this.onRoleClick}
                size="small"
              />
              <MenuBox
                title="Manager"
                icon={<i class="fas fa-tasks"></i>}
                dataName="manager"
                onClick={this.onRoleClick}
                size="small"
              />
            </div>
            <Button onClick={this.onCancelClick} value="Cancel" />
            <Button onClick={this.onInviteClick} value="Invite" />
          </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setNotification: (config) => {
            dispatch(setNotification(config));
        },
    };
};

const mapStateToProps = (state) => {
    return {
        account: state.account,
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(InviteUsersPopup);