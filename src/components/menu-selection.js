import React, { Component } from "react";

class MenuBox extends Component {
    constructor(props){
        super(props)

        this.state = {
            selected:this.props.selected
        }

        this.onMenuClick = this.onMenuClick.bind(this);
    }

    static defaultProps = {
        size:"medium",
        error:""
    }

    componentDidMount(){

    }

    onMenuClick(event){
        // Menu box will be used as a link to another page and a selectabkle item in a form.
        if(this.props.useAsLink || this.props.disabled)return;
        this.setState({selected:!this.state.selected});
        this.props.onClick(event, this.props.dataName)
    }


    render(){
        return(
            <div date-name={this.props.dataName} onClick={this.onMenuClick} className={`menu-box ${this.props.size} ${this.props.error} ${this.state.selected ?"selected":""}`}>
                {this.props.icon}
                {this.props.size==="small"? <p>{this.props.title}</p>:<h2>{this.props.title}</h2>  }
            </div>
        );
    }
}

export default MenuBox;