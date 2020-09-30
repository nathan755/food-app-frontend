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
            inviteUserPopupOpen:false,
            selectedRow:{},
            tableConfig:{},
            loading:true
        }

        this.onCreateUserMenuClick = this.onCreateUserMenuClick.bind(this);
        this.onInviteUserMenuClick = this.onInviteUserMenuClick.bind(this);
        this.closePopup = this.closePopup.bind(this);
        this.renderTable = this.renderTable.bind(this);
        this.onDeleteUserClick = this.onDeleteUserClick.bind(this);
        this.onUpdateUserClick = this.onUpdateUserClick.bind(this);


    }

    componentDidMount(){
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
                id:"1",
                values:[
                    "nathan",
                    "denholm",
                    "nathan@mail.com",
                    "employee",
                    "button",

                    
                 ],
                 data:{
                    firstName:"nathan1",
                    lastName:"denholm1",
                    email:"nathan@mail.com1",
                    role:"employee1"
                 },
                 buttons:[
                    {
                        dataKey:"1",
                        value:"DELETE",
                        onClick:this.onDeleteUserClick,
                        loading:false,
                        disabled:false,
                        style:"danger"
                    },
                    {
                        dataKey:1,
                        value:"UPDATE",
                        onClick:this.onUpdateUserClick,
                        loading:false,
                        disabled:false,
                        style:"warning"
                    }
                 ]     
                },
                {
                    id:"2",
                    values:[
                       "nathan",
                       "denholm",
                       "nathan@mail.com",
                       "employee",
                       "button",
   
                       
                    ],
                    data:{
                        firstName:"nathan2",
                        lastName:"denholm2",
                        email:"nathan@mail.com2",
                        role:"employee2"
                     },
                    buttons:[
                        {
                            dataKey:"2",
                            value:"DELETE",
                            onClick:this.onDeleteUserClick,
                            loading:false,
                            disabled:false,
                            style:"danger"
                        },
                        {
                            dataKey:"2",
                            value:"UPDATE",
                            onClick:this.onUpdateUserClick,
                            loading:false,
                            disabled:false,
                            style:"warning"
                        }
                     ]     
                   },
                   {
                    id:"3",
                    values:[
                       "nathan",
                       "denholm",
                       "nathan@mail.com",
                       "employee",
                       "button",
   
                       
                    ],
                    data:{
                        firstName:"nathan3",
                        lastName:"denholm3",
                        email:"nathan@mail.com3",
                        role:"employee3"
                     },
                    buttons:[
                        {
                            dataKey:"3",
                            value:"DELETE",
                            onClick:this.onDeleteUserClick,
                            loading:false,
                            disabled:false,
                            style:"danger"
                        },
                        {
                            dataKey:"3",
                            value:"UPDATE",
                            onClick:this.onUpdateUserClick,
                            loading:false,
                            disabled:false,
                            style:"warning"
                        }
                     ]     
                   }
                   
            ]
        };
        this.setState({tableConfig,loading:false});
    }

    onDeleteUserClick(event){
        const selectedId = event.currentTarget.getAttribute("data-key");
        const selectedData = this.state.tableConfig.rows.find(item => item.id === selectedId );
        this.setState({selectedData:selectedData.data});
    }

    onUpdateUserClick(event){
        const selectedId = event.currentTarget.getAttribute("data-key");
        const selectedData = this.state.tableConfig.rows.find(item => item.id === selectedId );
        this.setState({selectedData:selectedData.data});

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
        if(!this.state.loading){
            return(<Table config={this.state.tableConfig} />);
        }
        return null;
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