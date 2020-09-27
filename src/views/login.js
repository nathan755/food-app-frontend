import React, { Component } from "react";
import TextFormField from "../components/text-form-field";
import Button from "../components/button";
import {Link} from "react-router-dom";

class Login extends Component {
    constructor(props){
        super(props)

        this.state = {
            email:"",
            password:"",
            emailError:true,
            passwordError:true
        }

        this.onInputChange = this.onInputChange.bind(this);

    }

    onInputChange(event){
        console.log("event", event)
    }

    onLoginClick(event){
        console.log("event", click)
    }


    render(){
        return (
            <div className="login">
                <TextFormField 
                    errorMessage="Field required" 
                    dataKey="email" 
                    hasErrors={this.state.emailError}
                    label="Email" 
                    placeholder="Email..."
                    onChange={this.onInputChange} 
                />
                 <TextFormField 
                    errorMessage="Field required" 
                    dataKey="password" 
                    hasErrors={this.state.passwordError}
                    label="Email" 
                    placeholder="Password..."
                    onChange={this.onInputChange} 
                />
                <Button onClick={this.onLoginClick} value="Login" />
                <Link to="/reset-password"><small>Forgot your password?</small></Link>
                <Link to="/sign-up"><p>Need an Account?</p></Link>
            </div>
        )
    }
}

export default Login;