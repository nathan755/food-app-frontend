import React, { Component } from "react";
import TextFormField from "../components/text-field";
import Button from "../components/button";
import {Link} from "react-router-dom";

class Login extends Component {
    constructor(props){
        super(props)

        this.state = {
            email:"",
            password:"",
            emailError:false,
            passwordError:false
        }

        this.onInputChange = this.onInputChange.bind(this);

    }

    onInputChange(event){
        console.log("event", event)
    }

    onLoginClick(event){
        console.log("event", event)
    }


    render(){
        return (
            <div className="login">
                <h1>Login</h1>
                <div className="login__fields">
                    <TextFormField 
                        errorMessage="" 
                        dataKey="email" 
                        hasErrors={this.state.emailError}
                        label="Email" 
                        placeholder="Email..."
                        onChange={this.onInputChange} 
                    />
                    <TextFormField 
                        errorMessage="" 
                        dataKey="password" 
                        hasErrors={this.state.passwordError}
                        label="Email" 
                        placeholder="Password..."
                        onChange={this.onInputChange} 
                    />
                </div>


               <div className="login__buttons" >
                <Button onClick={this.onLoginClick} value="Login" />
                    <Link to="/reset-password"><small>Forgot your password?</small></Link>
               </div>
                
                <Link to="/sign-up"><p>Need an Account?</p></Link>
            </div>
        )
    }
}

export default Login;