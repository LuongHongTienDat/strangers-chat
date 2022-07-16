import {useState, useEffect, useContext} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import classes from "./Profile.module.css"
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import { getJoinedRooms, joinRoom } from '../../api/profileApi';
import { useNavigate } from 'react-router-dom';
import { FaRocketchat } from "react-icons/fa";
import AuthContext from '../../store/auth-context';
const Profile = props => {
    const authCtx = useContext(AuthContext)
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [rooms, setRooms] = useState([]);
    const [groupName, setGroupName] = useState("")
    const [errorGroup, setErrorGroup] = useState("")

    useEffect(() => {
        (async () => {
            try {
              setIsLoading(true);
              const data = await getJoinedRooms(authCtx.token)
              setRooms(data);
            } catch (error) {
              setIsError(true);
            } finally {
              setIsLoading(false);
            }
        })();
    },[])

    const groupNameChangeHandler = e =>{
        setGroupName(e.target.value);
    }
    const addGroup = async (e)=>{
        e.preventDefault()
        const result = await joinRoom(JSON.parse(localStorage.getItem('user')).token,groupName);
        if (!result.message){
            setRooms(prev=>[...prev,result]);
            setGroupName("");
            setErrorGroup("");
        }
        else {
            setErrorGroup(result.message)
        }
    }
    const logout = ()=>{
        authCtx.logout();
        navigate('/')
    }
    if (isLoading) {
        return <p>Loading posts...</p>;
      }
    
    if (isError) {
        return <p>There was an error trying to load the posts.</p>;
    }

    return (
        <div className='row'>
            <Card className = {classes.input}>
                <div className = {`${classes['profileTitle']}`}>YOUR GROUPS <FaRocketchat/></div> 
                <div className = {`${classes['flex-container']}`}>
                    {rooms.map( (room) => {
                        return (<div key={room.title} onClick={()=>{navigate(`../chatroom/${room.title}`)}}> {room.title} </div>)
                    } )}
                </div>
                <div className = {`${classes['logout-container']}`}> 
                    <Button onClick={logout} >LOG OUT</Button>
                </div>
            </Card>
            <Card className = {classes.input}>
                <form onSubmit={addGroup} className = {classes.formGroup}>
                    <label htmlFor='groupName'>JOIN NEW GROUP</label>
                    <input id="groupName" type="text" value={groupName} onChange={groupNameChangeHandler} placeholder="Enter group name"></input>
                    <Button type='submit'>Add group</Button>
                </form> 
                {(errorGroup!="") && <p className = {`${classes['error']}`}>{errorGroup}</p>} 
            </Card>
        </div>
        
    )
}
export default Profile;