import React, { Component } from "react";
import TextFormField from "../components/text-field";
import Button from "../components/button";
import {Link, Redirect} from "react-router-dom";

class Login extends Component {
    constructor(props){
        super(props)

        this.state = {
            email:"",
            password:"",
            emailErrorMessage:"",
            passwordErrorMessage:"",
            loading:false,
            redirect:false
        }

        this.onInputChange = this.onInputChange.bind(this);
        this.onLoginClick = this.onLoginClick.bind(this);
    }
    
    onInputChange(event){
        const currentInputValue = event.currentTarget.getAttribute("data-key");
        this.setState({[currentInputValue]:event.target.value});
    }

    onLoginClick(event){
        // redux action to login.. ugh
        if(this.validateInput()===true){
            this.setState({loading:true});
        }
    }

    validateInput(){
        let emailErrorMessage="", passwordErrorMessage="", validateForm=true;

        if(this.state.email ===""){
            emailErrorMessage = "Email Field Required";
            validateForm = false;
        }
        if(this.state.password === ""){
            passwordErrorMessage = "Password Field Required";
            validateForm = false;
        }
        if(validateForm === false){
            this.setState({
                emailErrorMessage,
                passwordErrorMessage
            });
        }
        return validateForm;
    }
    
    render(){
        if(this.state.redirect){
            return <Redirect to="/dashboard" />;
        }

        return (
            <div className="login">
                <h1>Login</h1>
                <div className="login__fields">
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
                </div>


               <div className="login__buttons" >
                <Button onClick={this.onLoginClick} value="Login" loading={this.state.loading} />
                    <Link to="/reset-password"><small>Forgot your password?</small></Link>
               </div>
                
                <Link to="/sign-up"><p>Need an Account?</p></Link>
            </div>
        )
    }
}

export default Login;