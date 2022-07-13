import React from 'react'
import classes from './UserMessage.module.css'
const UserMessage = props => {
    return (
        <div className={`${classes.outgoing_msg}`}>
            <div className={`${classes.sent_msg}`}>
                <p>{props.children}</p>
                <span className={`${classes.time_date}`}>{props.time}</span> 
            </div>
        </div>
    )
}

export default UserMessage;
