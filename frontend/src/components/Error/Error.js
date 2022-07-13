import React from 'react'
import classes from './Error.module.css'
import { FaRegSadCry } from "react-icons/fa";

const Error = props => {
    return (
        <div className={`${classes.error}`}>
            <FaRegSadCry className={`${classes.icon}`}/>{props.children}
        </div>
    )
};

export default Error