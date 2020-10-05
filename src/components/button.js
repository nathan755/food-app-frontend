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
            <div data-key={this.props.dataKey} onClick={this.onClick} className={`button ${this.props.style}`}>
                {this.props.loading && <i class="fas fa-spinner fa-spin"></i>}
                <button >{this.props.loading ? "Loading":this.props.value }</button>
                
            </div>
        );
    }
}

export default Button;