import React, { Component } from "react";
import CreateUserPopup from "./create-user";
import InviteUsers from "./invite-users";
import { connect } from "react-redux";

class Popup extends Component {
    constructor(props){
        super(props)

    }
    
    render(){
        switch (this.props.type) {
            case "create-user":
                return <CreateUserPopup />
            case "invite-users":
                return <InviteUsers />
            default:
                return null;
        }
    }
}

const mapStateToProps = (state) => {
    return {
        type:state.popup.type
    }
}

export default connect(mapStateToProps)(Popup);