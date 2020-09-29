import React, { Component } from "react";

class MenuBox extends Component {
    constructor(props){
        super(props)

        this.state = {
            selected:false
        }

        this.onMenuClick = this.onMenuClick.bind(this);

    }

    onMenuClick(event){
        // Menu box will be used as a link to another page and a selectabkle item in a form.
        if(this.props.useAsLink)return;
        this.setState({selected:!this.state.selected});
        this.props.onClick(event)
    }


    render(){
        return(
            <div onClick={this.onMenuClick} className={`menu-box ${this.state.selected ?"selected":""}`}>
                {this.props.icon}
                <h2>{this.props.title}</h2>
            </div>
        );
    }
}

export default MenuBox;