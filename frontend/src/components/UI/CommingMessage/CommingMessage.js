import React from 'react'
import classes from './CommingMessage.module.css'
const CommingMessage = props => {
    return (
        <div className={`${classes.incoming_msg}`}>
            <div className={`${classes.incoming_msg_img}`}> <img src="https://ptetutorials.com/images/user-profile.png" className={`${classes.msg_img}`} alt="sunil" /> </div>
            <div className={`${classes.received_msg}`}>
                <div className={`${classes.received_withd_msg}`}>
                    <p>{props.children}</p>
                    <span className={`${classes.time_date}`}>
                        <span>{props.user} </span>
                        - {props.time}
                    </span>                
                </div>
            </div>
        </div>
    )
}

export default CommingMessage;
