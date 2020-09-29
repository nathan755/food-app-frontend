import React, { Component } from "react";
import TextFormField from "../text-field";

class CreateUserPopup extends Component {
    constructor(props){
        super(props)

        this.state = {

        }

        this.onInputChange = this.onInputChange.bind(this);
    }

    onInputChange(){

    }


    render(){
        return(
            <div className="create-user-popup">
                <TextFormField 
                    errorMessage={this.state.EmailErrorMessage}
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
                <TextFormField 
                    errorMessage={this.state.EmailErrorMessage}
                    dataKey="email" 
                    label="Email" 
                    placeholder="Email..."
                    onChange={this.onInputChange} 
                />
            </div>  
        )
    }

}

export default CreateUserPopup;