import React, { Component } from "react";

class Button extends Component {

    onClick = (event) => {
        if(this.props.disabled)return;
        this.props.onClick(event);
    }

    render(){
        return (
            <div className={`button ${this.props.secondary ? "secondary":""}`}>
                <button onClick={this.onClick}>{this.props.value}</button>
            </div>
        );
    }
}

export default Button;