import React, { Component } from "react";
import TextFormField from "../text-field";
import MenuBox from "../menu-selection";
import Button from "../button";
import { connect } from "react-redux";
import { removePopup } from "../../redux/actions/popup";
import Axios from "axios";
// this is garbage just use the sign up page and edit it slightly - change this to user pop up
import { setNotification } from "../../redux/actions/notification";

class CreateUserPopup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            disableEmployee: false,
            disableManager: false,
            emailErrorMessage: "",
            passwordErrorMessage: "",
            confirmPasswordErrorMessage: "",
            nameErrorMessage: "",
            roleErrorMessage: "",
            role: "",
            email: "",
            password: "",
            confirmPassword: "",
            name: "",
            loading: true,
        };

        this.onInputChange = this.onInputChange.bind(this);
        this.onRoleClick = this.onRoleClick.bind(this);
        this.onCreateUserClick = this.onCreateUserClick.bind(this);
        this.onCancelClick = this.onCancelClick.bind(this);
        this.onUpdateUserClick = this.onUpdateUserClick.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.role !== this.state.role) {
            if (this.state.role === "employee") {
                this.setState({ disableManager: true });
            } else if (this.state.role === "manager") {
                this.setState({ disableEmployee: true });
            } else {
                this.setState({
                    disableEmployee: false,
                    disableManager: false,
                });
            }
        }
    }
    
    onInputChange(event) {
        const currentInputValue = event.currentTarget.getAttribute("data-key");
        this.setState({ [currentInputValue]: event.target.value });
    }

    onRoleClick(event, type) {
        if (type === "manager") {
            this.setState({ role: this.state.role === "manager" ? "" : "manager" });
        }
        if (type === "employee") {
            this.setState({ role: this.state.role === "employee" ? "" : "employee" });
        }
    }

    async onUpdateUserClick(){
        // if field == "":
        //      use props data
        // if field !== "":
        //      use state, because user has changed data
        if(this.state.role === ""){
            this.setState({roleErrorMessage:"Pick a role"})
            return;
        }
        const config = {
            method:"patch",
            baseURL:"http://127.0.0.1:3001/",
            url:"update-user",
            data:{
                email:this.state.email===""?this.props.config.email:this.state.email,
                role:this.state.role,
                first_name:this.state.email===""?this.props.config.firstName:this.state.name,
                last_name:this.state.email===""?this.props.config.lastName:this.state.name
            },
            params:{
                userId:this.props.config.id
            },
        }
        try {
            const res = await Axios(config);
            if(res.status === 201){
                const sucessNotificationConfig = {
                    copy: this.props.config.firstName +" "+this.props.config.lastName +"details were updated",
                    title: "User Updated",
                    displayTime: 3000,
                    type: "success",
                };
                this.props.setNotification(sucessNotificationConfig);
                this.props.closePopup();
                this.props.onSubmit();
            }
        } 
        catch (error) {
            const failNotificationConfig = {
                copy: "Cant Update User",
                title: "There was an error updating, try again later",
                displayTime: 3000,
                type: "danger",
            };
            this.props.setNotification(failNotificationConfig);
        }
    }
    
    onCreateUserClick() {
        if (this.validateFields()) {
            // set query param <user=true> because /signup handles account and user signup
            Axios.post(`http://127.0.0.1:3001/account-sign-up?user=true`, {
                email: this.state.email,
                password: this.state.password,
                role: this.state.role,
                first_name: this.state.name,
                last_name: this.state.name,
                company_id: this.props.account.accountId,
            })
            .then((response) => {
                const sucessNotificationConfig = {
                    copy: "User Created",
                    title: this.state.name + "has been added to the system",
                    displayTime: 3000,
                    type: "success",
                };
                    this.props.setNotification(sucessNotificationConfig);
                    // call parent create user function => trigger table to fetch updated data
                    this.props.onSubmit();
                })
            .catch((err) => {
                const failNotificationConfig = {
                    copy: "Error creating user try agina",
                    title: "Unable To Create User",
                    displayTime: 3000,
                    type: "danger",
                };
                this.props.setNotification(failNotificationConfig);
            });
        }
    }

    onCancelClick() {
        this.props.closePopup();
    }

    validateFields() {
        // make form component in future and loop over the fields cuz dis is dumb
        const errorMessage = "Field Required";
        let isValidated = true,
            emailErrorMessage = "",
            passwordErrorMessage = "",
            confirmPasswordErrorMessage = "",
            roleErrorMessage = "",
            nameErrorMessage = "";
        if (this.state.email === "") {
            isValidated = false;
            emailErrorMessage = errorMessage;
        }
        if (this.state.password === "") {
            isValidated = false;
            passwordErrorMessage = errorMessage;
        }
        if (this.state.confirmPassword === "") {
            isValidated = false;
            confirmPasswordErrorMessage = errorMessage;
        }
        if (this.state.role === "") {
            isValidated = false;
            roleErrorMessage = errorMessage;
        }
        if (this.state.name === "") {
            isValidated = false;
            nameErrorMessage = errorMessage;
        }
        this.setState({
            emailErrorMessage,
            passwordErrorMessage,
            confirmPasswordErrorMessage,
            roleErrorMessage,
            nameErrorMessage,
        });
        return isValidated;
    }

    render() {
       return (
            <div className="create-user-popup popup">
                <h1>{this.props.type === "update-user" ? "Update User" : "Create User"}</h1>
                <TextFormField
                    value={
                        this.props.type === "update-user"
                            ? this.props.config.email
                            : ""
                    }
                    errorMessage={this.state.emailErrorMessage}
                    dataKey="email"
                    label="Email"
                    placeholder="Email..."
                    onChange={this.onInputChange}
                />
                {this.props.type === "create-user" && (
                    <>
                        <TextFormField
                            errorMessage={this.state.passwordErrorMessage}
                            dataKey="password"
                            label="Password"
                            placeholder="Password..."
                            onChange={this.onInputChange}
                        />
                        <TextFormField
                            errorMessage={this.state.confirmPasswordErrorMessage}
                            dataKey="confirmPassword"
                            label="Confirm Password"
                            placeholder="Confirm Password..."
                            onChange={this.onInputChange}
                        />
                    </>
                )}
                <label className="box-label">Role</label>
                <div className="create-user-popup__box-container">
                    <MenuBox
                        dataName="employee"
                        error={this.state.employeeError}
                        size={"small"}
                        icon={<i class="fas fa-people-carry"></i>}
                        title="Employee"
                        onClick={this.onRoleClick}
                        disabled={this.state.disableEmployee}
                    />
                    <MenuBox
                        dataName="manager"
                        size={"small"}
                        icon={<i class="fas fa-tasks"></i>}
                        title="Manager"
                        onClick={this.onRoleClick}
                        disabled={this.state.disableManager}
                        error={this.state.managerError}
                    />
                    {this.state.roleErrorMessage !== "" && (
                        <small className="roleErrorText">Field Required</small>
                    )}
                </div>
                <TextFormField
                    value={
                        this.props.type === "update-user"
                            ? this.props.config.firstName
                            : ""
                    }
                    errorMessage={this.state.nameErrorMessage}
                    dataKey="name"
                    label="Full Name"
                    placeholder="Full Name..."
                    onChange={this.onInputChange}
                />
                <Button
                    value={this.props.type==="update-user" ? "Update User" : "Create User"}
                    onClick={
                        this.props.type === "update-user" 
                            ? this.onUpdateUserClick
                            : this.onCreateUserClick
                    }
                />
                <Button value="Cancel" secondary={true} onClick={this.onCancelClick} />
                <div className="clear"></div>
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
        popup: state.popup,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateUserPopup);
