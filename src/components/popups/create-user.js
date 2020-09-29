import React, { Component } from "react";
import TextFormField from "../text-field";
import MenuBox from "../menu-selection";
import Button from "../button";

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
    }

    onCancelClick(){
        // call props cancel function to close pop up 
    }

    validateFields(){

    }


    render(){
        return(
            <div className="create-user-popup">
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
                </div>
                  
                      <TextFormField 
                    errorMessage={this.state.nameErrorMessage}
                    dataKey="name" 
                    label="Full Name" 
                    placeholder="Full Name..."
                    onChange={this.onInputChange} 
                />
                <Button value="Create User" onClick={this.onCreateUserClick}/>
                <Button value="Cancel" onClick={this.onCancelClick}/>

            </div>  
        )
    }

}

export default CreateUserPopup;