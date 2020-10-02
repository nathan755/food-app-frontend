import React, { Component } from "react";
import AreYouSure from "../components/popups/are-you-sure";
class Playground extends Component {
    render(){
        return(
            <div>
                <AreYouSure copy="are you sure you wish to do tht"/>
            </div>
        )
    
    }
}

export default Playground;