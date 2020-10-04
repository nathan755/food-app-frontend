import React from "react";
import Button from "../button";


// confimr delete schema join 
//  table  | confirm_delete | account_id    
//  ----------------------------------
//  user    | 1             | 
//          |               |    
//          |               |
//          |
//   or just go to the neccessery table and do stuff where account id == ?? 
//
//
//







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
                <Button value="NO" onClick={props.onNoClick} style="danger" />
            </div>
        </div>
    );
}

export default AreYouSure;