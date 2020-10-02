import React, { Component } from "react";
import TextFormField from "../text-field";
import MenuBox from "../menu-selection";
import Button from "../button";
import {connect} from "react-redux";
import { removePopup } from "../../redux/actions/popup";
import Axios from "axios";
// this is garbage just use the sign up page and edit it slightly
 import {setNotification} from "../../redux/actions/notification";

class CreateUserPopup extends Component {
    constructor(props){
        super(props)
        
        this.state = {
            disableEmployee:false,
            disableManager:false,
            emailErrorMessage:"",
            passwordErrorMessage:"",
            confirmPasswordErrorMessage:"",
            nameErrorMessage:"",
            roleErrorMessage:"",
            role:"",
            email:"",
            password:"",
            confirmPassword:"",
            name:""
        }

        this.onInputChange = this.onInputChange.bind(this);
        this.onRoleClick = this.onRoleClick.bind(this);
        this.onCreateUserClick = this.onCreateUserClick.bind(this);
        this.onCancelClick = this.onCancelClick.bind(this);
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.role !== this.state.role){
            if(this.state.role === "employee"){
                this.setState({disableManager:true});
            }
            else if(this.state.role === "manager"){
                this.setState({disableEmployee:true});
            }
            else {
                this.setState({
                    disableEmployee:false,
                    disableManager:false
                });
            }
        }
    }

    onInputChange(event){
        const currentInputValue = event.currentTarget.getAttribute("data-key");
        this.setState({[currentInputValue]:event.target.value});
    }

    onRoleClick(event, type){
        console.log("click",type)
        if(type === "manager"){
            this.setState({role:this.state.role==="manager"?"":"manager"})
        }
        if(type === "employee"){
            this.setState({role:this.state.role==="employee"?"":"employee"})
        }
    }

    onCreateUserClick(){
        // make request to db with user data
        if(this.validateFields()){
            Axios.post(`http://127.0.0.1:3001/account-sign-up?user=true`,{
                    email:this.state.email,
                    password:this.state.password,
                    role:this.state.role,
                    first_name:this.state.name,
                    last_name:this.state.name,
                    company_id:this.props.account.accountId
            })
            .then((response)=>{
                console.log("response",response)
                const sucessNotificationConfig = {
                    copy:"User Created",
                    title:this.state.name+ "has been added to the system",
                    displayTime:3000,
                    type:"success"
                }
                this.props.setNotification(sucessNotificationConfig);
            })
            .catch((err)=>{
                console.log("err",err)
                const failNotificationConfig = {
                    copy:"Error creating user try agina",
                    title:"Unable To Create User",
                    displayTime:3000,
                    type:"danger"
                }
                this.props.setNotification(failNotificationConfig);

            })
        }
    }

    onCancelClick(){
        // add are you sure pop up!
        this.props.removePopup();
    }

    validateFields(){
        // make form component in future and loop over the fields cuz dis is dumb
        const errorMessage = "Field Required"
        let isValidated = true, emailErrorMessage="", passwordErrorMessage="",confirmPasswordErrorMessage="",roleErrorMessage="",nameErrorMessage="";
        if(this.state.email===""){
            isValidated = false;
            emailErrorMessage =errorMessage
        }
        if(this.state.password===""){
            isValidated = false;
            passwordErrorMessage = errorMessage
        }
        if(this.state.confirmPassword===""){
            isValidated = false;
            confirmPasswordErrorMessage=errorMessage
        }
        if(this.state.role===""){
            isValidated = false;
            roleErrorMessage = errorMessage
        }
        if(this.state.name===""){
            isValidated = false;
            nameErrorMessage =errorMessage
        }

        this.setState({
            emailErrorMessage,
            passwordErrorMessage,
            confirmPasswordErrorMessage,
            roleErrorMessage,
            nameErrorMessage
        })

        return isValidated;


    }
    
    render(){
        console.log("this.props", this.props.account.accountId)
        return(
            <div className="create-user-popup">
                <h1>Create User</h1>
                <TextFormField 
                    errorMessage={this.state.emailErrorMessage}
                    dataKey="email" 
                    label="Email" 
                    placeholder="Email..."
                    onChange={this.onInputChange} 
                />
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
                    {this.state.roleErrorMessage!=="" && <small className="roleErrorText">Field Required</small>}
                </div>
                <TextFormField 
                    errorMessage={this.state.nameErrorMessage}
                    dataKey="name" 
                    label="Full Name" 
                    placeholder="Full Name..."
                    onChange={this.onInputChange} 
                />
                <Button value="Create User" onClick={this.onCreateUserClick}/>
                <Button value="Cancel" secondary={true} onClick={this.onCancelClick}/>
                <div className="clear"></div>
            </div>  
        );
    }

}

const mapDispatchToProps = (dispatch) => {
    return{
        removePopup:()=>{dispatch(removePopup())},
        setNotification:(config)=>{dispatch(setNotification(config))}
    }
}

const mapStateToProps = (state) => {
    return{
        account:state.account
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CreateUserPopup);