import React, {useEffect, useState} from 'react'
import Card from '../UI/Card';
import Button from '../UI/Button';
import classes from './RegisterForm.module.css'
const RegisterForm = props => {
    const [enteredUsername, setEnteredUsername] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');

    const addUserHandler = (event) => {
        event.preventDefault();
        if (enteredUsername.trim().length === 0) {
            props.onError({
                title: "Invalid input",
                message: "Please enter your name"
            })
            return;
        }
        if (enteredPassword < 1) {
            props.onError({
                title: "Invalid input",
                message: "The password is invalid"
            })
            return;
        }
        props.onRegister(enteredUsername,enteredPassword);
        setEnteredPassword('')
        setEnteredUsername('')
    }
    const usernameChangeHandler = (event) => {
        setEnteredUsername(event.target.value);
    }
    const passwordChangeHandler = (event) => {
        setEnteredPassword(event.target.value);
    }


    return (

            <Card className = {classes.input}>
                <form onSubmit={addUserHandler}>
                    <label htmlFor='username'>User Name</label>
                    <input id="username" type="text" value={enteredUsername} onChange={usernameChangeHandler}></input>
                    <label htmlFor='password'>Password</label>
                    <input id="password" type="password" autoComplete="on" value={enteredPassword} onChange={passwordChangeHandler}></input>
                    <Button type='submit'>REGISTER OR SIGN IN</Button>
                </form>   
            </Card>

    )
};
export default RegisterForm;