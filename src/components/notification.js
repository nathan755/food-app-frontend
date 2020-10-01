import React, { Component } from "react";
/**
* Notification 
* props.copy string||undefined
* props.type string <danger><warning><success><info>||default -> info
* props.copy string||undefined
* props.title string
* props.displayTime int --> default 5000 m/s
*/
class Notification extends Component{
    constructor(props){
        super(props)
    }

    static defautProps = {
        type:"info",
        displayTime:5000
    }
    
    onCloseClick = () => {
        // send redux action to force close a notificatiojn     
    }

    render(){
        return(
            <div className={`notification ${this.props.type}`}>
                <i class="fas fa-times-circle"></i>
                <h3>{this.props.title}</h3>
                <p>{this.props.copy}</p>
            </div>
        );
    }
}

export default Notification;