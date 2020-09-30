import React, { Component } from "react";

class Button extends Component {

    onClick = (event) => {
        if(this.props.disabled)return;
        this.props.onClick(event);
    }

    static defaultProps = {
        style:"primary"
        
    }

    render(){
        return (
            <div className={`button ${this.props.style}`}>
                {this.props.loading && <i class="fas fa-spinner fa-spin"></i>}
                <button onClick={this.onClick}>{this.props.loading ? "Loading":this.props.value }</button>
                
            </div>
        );
    }
}

export default Button;