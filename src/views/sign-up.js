import React, { Component } from "react";
import TextFormField from "../components/text-field";
import Button from "../components/button";
import {Link} from "react-router-dom";

class SignUp extends Component {
    constructor(props){
        super(props)

        this.state = {
            email:"",
            password:"",
            username:"",
            role:"",
            firstName:"",
            lastName:"",
            companyName:"",
            usernameError:false,
            roleError:false,
            firstNameError:false,
            lastNameError:false,
            companyNameError:false,
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
            <div className="sign-up">
                <h1>Sign Up</h1>
                <div className="sign-up__fields">
                    <div className="sign-up__fields-left">
                        <TextFormField 
                            errorMessage="" 
                            dataKey="username" 
                            hasErrors={this.state.usernameError}
                            label="Username" 
                            placeholder="Username..."
                            onChange={this.onInputChange} 
                        />
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
                            label="Password" 
                            placeholder="Password..."
                            onChange={this.onInputChange} 
                        />
                        <TextFormField 
                            errorMessage="" 
                            dataKey="confirm-password" 
                            hasErrors={this.state.confirmPasswordError}
                            label="Confirm Password" 
                            placeholder="Confirm Password..."
                            onChange={this.onInputChange} 
                        />
                    </div>
                    <div className="sign-up__fields-right">
                        <TextFormField 
                            errorMessage="" 
                            dataKey="role" 
                            hasErrors={this.state.roleError}
                            label="Role" 
                            placeholder="Role..."
                            onChange={this.onInputChange} 
                        />
                        <TextFormField 
                            errorMessage="" 
                            dataKey="first-name" 
                            hasErrors={this.state.firstNameError}
                            label="First Name" 
                            placeholder="First Name..."
                            onChange={this.onInputChange} 
                        />
                        <TextFormField 
                            errorMessage="" 
                            dataKey="last-name" 
                            hasErrors={this.state.confirmPasswordError}
                            label="Confirm Password" 
                            placeholder="Confirm Password..."
                            onChange={this.onInputChange} 
                        />
                    </div>
                   
                    
                </div>


               <div className="sign-up__buttons" >
                <Button onClick={this.onLoginClick} value="Sign Up" />
                </div>
                <div>
                <Link to="/login"><small>Already have an Account?</small></Link>

                </div>
            </div>
        )
    }
}

export default SignUp;