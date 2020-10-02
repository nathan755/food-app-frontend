import React from "react";
import Button from "../button";

function AreYouSure(props) {
    return(
        <div className="are-you-sure">
            <div>
                <h2>Are You Sure?</h2>
            </div>
            <hr/>
            <div>
                <p>{props.copy}</p>
            </div>
            <hr/>
            <div>
                <Button value="YES" onClick={props.onYesClick} style="success" />
                <Button value="NO" onClick={props.onYesClick} style="danger" />
            </div>
        </div>
    );
}

export default AreYouSure;