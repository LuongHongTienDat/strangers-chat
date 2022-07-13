import React from 'react'
import Card from '../UI/Card';
import classes from './UserList.module.css'

const UserList = props => {
    return (
        props.users.length != 0 && (<Card className={classes.users}>
            <ul>
                {props.users.map((user,index) => {
                    return (
                        <li key={index}>
                            {user.name} ({user.age} years old)
                        </li>
                    )
                })}
            </ul>
        </Card>)
    )
};

export default UserList