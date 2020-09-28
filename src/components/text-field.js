import React, { Component } from "react";

class TextFormField extends Component {
    constructor(props){
        super(props)

        this.state = {
            value:"",
        }

        this.onInputChange = this.onInputChange.bind(this);

    }
    
    onInputChange(event){
        this.setState({value:event.target.value});
        this.props.onChange(event);
    }


    render(){
        return(
            <div className={`form-field-text`}>
                <label>{this.props.label}</label>
                <div className={`form-field-text__input ${this.props.errorMessage !=="" ? "error":""}`}>
                    <input onChange={this.props.onChange} data-key={this.props.dataKey} placeholder={this.props.placeholder}/>
                </div>
                <small>{this.props.errorMessage}</small>
            </div>
        );
    }
}

export default TextFormField;