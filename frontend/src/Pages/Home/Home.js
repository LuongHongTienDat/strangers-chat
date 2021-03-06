import {useState, useEffect, useContext} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import classes from "./Home.module.css"
import RegisterForm from '../../components/Users/RegisterForm';
import { login } from '../../api/userApi';
import { useNavigate } from 'react-router-dom';
import ErrorModal from '../../components/UI/ErrorModal'
import { FaRegUser } from "react-icons/fa";
import AuthContext from '../../store/auth-context';
const Home = props => {
    const navigate = useNavigate()
    const authCtx = useContext(AuthContext)
    useEffect(()=>{
        if (localStorage.getItem("user")){    
            navigate("/profile")
        }
    },[])
    const [error, setError] = useState(null)
    const onRegister = async (userName, password)=>{
        const newUser = await login({userName, password});
        if (newUser.message){
            setError({
                title: "Invalid information",
                message: newUser.message
            })
        }
        else {
            newUser.expirationTime = new Date();
            newUser.expirationTime.setDate(newUser.expirationTime.getDate() + 1);
            authCtx.login(newUser)
            navigate("/profile");
        }
    }
    const onErrorHandler = (e)=>{
        setError(e)
    }
    const errorHandler = () => {
        setError(null);
    }
    return (
        <>
            <div className="row">
                <div className={`col-lg-7 ${classes['form']}`}>
                    {error && <ErrorModal onConfirm = {errorHandler}  title = {error.title} message = {error.message}/>}
                    <RegisterForm onRegister={onRegister} onError={onErrorHandler}/>
                </div>
                <div className = {`col-lg-4 ${classes['icon']}`}>
                    <FaRegUser/>
                    <div className = {` ${classes['welcome']}`}>
                        WELCOME TO 
                        <p>STRANGERS CHAT</p>
                    </div>
                </div>
                {/* <div className = {`col-sm-1`}>

                </div> */}
            </div>

        </>
    )
}
export default Home;