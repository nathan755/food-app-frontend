import React, { Component } from "react";
import TextFormField from "../components/text-field";
import Button from "../components/button";
import {Link, Redirect} from "react-router-dom";
import Axios from "axios";
// two types of sign up accoutn sign up and user sign up
// user sign up will be allowed if there are querey params present ie they came from an invite link -- will have to add some sort of sign uo token.

class SignUp extends Component {
    constructor(props){
        super(props)

        this.state = {
            email:"",
            password:"",
            username:"",
            confirmPassword:"",
            firstName:"",
            lastName:"",
            companyName:"",
            usernameErrorMessage:"",
            firstNameErrorMessage:"",
            lastNameErrorMessage:"",
            companyNameErrorMessage:"",
            emailErrorMessage:"",
            passwordErrorMessage:"",
            confirmPasswordErrorMessage:"",
            loading:false,
            redirect:false
        }

        this.onInputChange = this.onInputChange.bind(this);
        this.onSignUpClick = this.onSignUpClick.bind(this);
        this.validateFields = this.validateFields.bind(this);

    }

    onInputChange(event){
        const currentInputValue = event.currentTarget.getAttribute("data-key");
        this.setState({[currentInputValue]:event.target.value});
    }

    onSignUpClick() {
        if (this.validateFields()===false) {
            this.setState({loading:true});
            Axios.post("http://127.0.0.1:3001/account-sign-up", {
                company_name: this.state.companyName,
                email: this.state.email,
                password: this.state.password,
                username: this.state.username,
                first_name: this.state.firstName,
                last_name: this.state.lastName,
            }).then(()=>{
                this.setState({redirect:true});
            }).catch((err)=>{
                // set some sort of errr message (use redux)
                this.setState({loading:false});
            });
        }
        
    }

    validateFields(){
        // later add the form fields into some sort of config object and make password requirments
        let usernameErrorMessage ="", emailErrorMessage="", passwordErrorMessage="", confirmPasswordErrorMessage="", companyNameErrorMessage="", firstNameErrorMessage="", lastNameErrorMessage="", formError=false;
        
        if(this.state.username === ""){
            usernameErrorMessage = "Username Required";
            formError = true;
        }
        if(this.state.email === ""){
            emailErrorMessage = "Email Required";
            formError = true;
        }
        if(this.state.password !== this.state.confirmPassword && this.state.password !=="" && this.state.confirmPassword !==""){
            passwordErrorMessage = "Passwords Dont Match";
            confirmPasswordErrorMessage = "Passwords Dont Match"
            formError = true;
        }
        if(this.state.password === ""){
            passwordErrorMessage = "Password Required";
            formError = true;
        }
        if(this.state.confirmPassword === ""){
            confirmPasswordErrorMessage = "Confirm Password Required";
            formError = true;
        }
        if(this.state.companyName=== ""){
            companyNameErrorMessage = "Company Name Required";
            formError = true;
        }
        if(this.state.firstName === ""){
            firstNameErrorMessage = "First Name Required";
            formError = true;
        }
        if(this.state.lastName === ""){
            lastNameErrorMessage = "Last Name Required";
            formError = true;
        }
        
        if (formError) {
            this.setState({
                usernameErrorMessage,
                firstNameErrorMessage,
                lastNameErrorMessage,
                companyNameErrorMessage,
                emailErrorMessage,
                passwordErrorMessage,
                confirmPasswordErrorMessage,
                formError
            });
        }
        
        return formError;

    }
    
    render(){
        if(this.state.redirect){
            return <Redirect to="login" />;
        }
        
        return (
            <div className="sign-up">
                <h1>Sign Up</h1>
                <div className="sign-up__fields">
                    <div className="sign-up__fields-left">
                        <TextFormField 
                            errorMessage={this.state.usernameErrorMessage}
                            dataKey="username" 
                            label="Username" 
                            placeholder="Username..."
                            onChange={this.onInputChange} 
                        />
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
                    </div>
                    <div className="sign-up__fields-right">
                        <TextFormField 
                            errorMessage={this.state.companyNameErrorMessage} 
                            dataKey="companyName" 
                            label="Company Name" 
                            placeholder="Company Name..."
                            onChange={this.onInputChange} 
                        />
                        <TextFormField 
                            errorMessage={this.state.firstNameErrorMessage} 
                            dataKey="firstName" 
                            label="First Name" 
                            placeholder="First Name..."
                            onChange={this.onInputChange} 
                        />
                        <TextFormField 
                            errorMessage={this.state.lastNameErrorMessage} 
                            dataKey="lastName" 
                            label="Last Name" 
                            placeholder="Last Name..."
                            onChange={this.onInputChange} 
                        />
                    </div>
                </div>
                <div className="sign-up__buttons" >
                    <Button onClick={this.onSignUpClick} value="Sign Up" loading={this.state.loading}/>
                </div>
                <div>
                    <Link to="/login"><small className="redirect">Already have an Account?</small></Link>
                </div>
            </div>
        );
    }
}

export default SignUp;