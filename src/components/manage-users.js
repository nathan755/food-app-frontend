import React, { Component } from "react";
import MenuBox from "./menu-selection";
import CreateUserPopup from "./popups/create-user";
import InviteUsersPopup from "./popups/invite-users";
import {setPopup, removePopup} from "../redux/actions/popup";
import {connect} from "react-redux";
import Table from "./table";

class ManageUsers extends Component {
    constructor(props){
        super(props)
        
        this.state = {
            createUserPopupOpen:false,
            inviteUserPopupOpen:false
        }

        this.onCreateUserMenuClick = this.onCreateUserMenuClick.bind(this);
        this.onInviteUserMenuClick = this.onInviteUserMenuClick.bind(this);
        this.sendInvites = this.sendInvites.bind(this);
        this.addUser = this.addUser.bind(this);
        this.closePopup = this.closePopup.bind(this);
        this.renderTable = this.renderTable.bind(this);
    }

    sendInvites(){

    }

    addUser(){

    }

    onCreateUserMenuClick(){
        this.setState({createUserPopupOpen:true});
        this.props.setPopup("create-user");
    }

    onInviteUserMenuClick(){
        this.setState({inviteUserPopupOpen:true});
        this.props.setPopup("invite-users")
    }

    closePopup(){
        this.setState({
            createUserPopupOpen:false,
            inviteUserPopupOpen:false
        })
    }

    renderTable(){
        const tableConfig = {
            title:"Users",
            header:[
                "First Name",
                "Last Name",
                "Email",
                "Role",
                "Action"
            ],
            rows:[
                {
                 values:[
                    "nathan",
                    "denholm",
                    "nathan@mail.com",
                    "employee",
                    "button",

                    
                 ],
                 data:{

                 },
                 buttons:[
                    {
                        value:"DELETE",
                        onclick:()=>{},
                        loading:false,
                        disabled:false,
                        style:"danger"
                    },
                    {
                        value:"UPDATE",
                        onclick:()=>{},
                        loading:false,
                        disabled:false,
                        style:"warning"
                    }
                 ]     
                },
                {
                    values:[
                       "nathan",
                       "denholm",
                       "nathan@mail.com",
                       "employee",
                       "button",
   
                       
                    ],
                    data:{
   
                    },
                    buttons:[
                       {
                           value:"DELETE",
                           onclick:()=>{},
                           loading:false,
                           disabled:false,
                           style:"danger"
                       },
                       {
                           value:"UPDATE",
                           onclick:()=>{},
                           loading:false,
                           disabled:false,
                           style:"warning"
                       }
                    ]     
                   },
                   {
                    values:[
                       "nathan",
                       "denholm",
                       "nathan@mail.com",
                       "employee",
                       "button",
   
                       
                    ],
                    data:{
   
                    },
                    buttons:[
                       {
                           value:"DELETE",
                           onclick:()=>{},
                           loading:false,
                           disabled:false,
                           style:"danger"
                       },
                       {
                           value:"UPDATE",
                           onclick:()=>{},
                           loading:false,
                           disabled:false,
                           style:"warning"
                       }
                    ]     
                   }
                   
            ]
        }

        return(<Table config={tableConfig} />);
    }


    render(){
        return(
            <div className="manage-users">
                <div className="manage-users__table">
                    <h1>Manage Users</h1>
                    <this.renderTable />
                </div>
                <div className="manage-users__buttons">
                    <MenuBox
                        icon={<i class="fas fa-user-plus"></i>}
                        title="Create User"
                        onClick={this.onCreateUserMenuClick}
                    />
                    <MenuBox
                        icon={<i class="fas fa-envelope"></i>}
                        title="Invite Users"
                        onClick={this.onInviteUserMenuClick}
                    />
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch)=>{
    return{
        setPopup:(type)=>{dispatch(setPopup(type))},
        removePopup:()=>{dispatch(removePopup())}
    }
}

export default connect(null, mapDispatchToProps)(ManageUsers);