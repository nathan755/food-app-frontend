import React, { Component } from "react";
import {connect} from "react-redux";
import {removeNotification} from "../redux/actions/notification";
import anime from "animejs";

/**
* Notification 
* 
* props.type string <danger><warning><success><info>||default -> info
* props.copy string||undefined
* props.title string
* props.displayTime int
*/
class Notification extends Component{
    constructor(props){
        super(props)
        
        this.renderIcon = this.renderIcon.bind(this);
    }

    componentDidMount(){
        const enter = document.getElementsByClassName("notification")[0];
        anime({
            targets:enter,
            duration:1800,
            translateX:-650
        });
    }
    
    onCloseClick = () => {
        this.props.removeNotification();
    }

    renderIcon(){
        switch (this.props.type) {
            case "danger":
                return <i class="fas fa-skull-crossbones"></i>;
            case "info":
                return <i class="fas fa-info-circle"></i>;
            case "success":
                return <i class="far fa-check-circle"></i>;
            case "warning":
                return <i class="fas fa-exclamation-triangle"></i>;
            default:
                return null;
        }
    }
    
    render(){
        setTimeout(()=>this.props.removeNotification(), this.props.displayTime);
        return(
            <div className={`notification ${this.props.type} ${this.props.notification.notificationVisible ? "open ":"closed"}`}>
                <div className="notification__icon-type">
                <   this.renderIcon />
                </div>
                <div className="notification__copy">
                    <h3>{this.props.title}</h3>
                    <p>{this.props.copy}</p>
                </div>
                <div onClick={this.onCloseClick} className="notification__close">
                    <i class="fas fa-times-circle"></i>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeNotification:()=>{dispatch(removeNotification())}
    }
}

const mapStateToProps = (state) =>{
    return{
        
        notification:state.notification
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Notification);