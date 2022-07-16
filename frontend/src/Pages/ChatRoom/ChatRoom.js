import {useState, useEffect, useRef, useContext} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import classes from "./ChatRoom.module.css"
import { FaTelegramPlane } from "react-icons/fa";
import Card from "../../components/UI/Card"
import {useParams} from "react-router-dom";
import CommingMessage from '../../components/UI/CommingMessage/CommingMessage';
import UserMessage from '../../components/UI/UserMessage/UserMessage';
import { getMessages } from '../../api/chatRoomApi';
import io from "socket.io-client";
import Error from '../../components/Error/Error';
import moment from 'moment';
import AuthContext from '../../store/auth-context';
const ChatRoom = props => {
    const authCtx = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState({status: false, message:""});
    var socket = useRef();
    const [messages, setMessages] = useState([]);
    const [enteredMess, setEnteredMess] = useState("")
    const { title } = useParams();
    const bottomRef = useRef(null);

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const data = await getMessages(authCtx.token, title )
                if (data.message){
                    throw new Error(data.message)
                }
                setMessages(data)
            } catch (error) {
                setIsError({status:true, message: "You has not joined this room!"});
            } finally {
                setIsLoading(false);
                const client = io('http://localhost:5000',{
                    auth:   {token: authCtx.token, title},
                    transports: [ 'websocket' ],
                    path: "/socket.io/socket.io.js"
                });  
                // socket.on("message", data => {
                client.on('connect', () => {
                    client.on('receiveMessage', (data) => {
                        setMessages(prev=>[...prev, data])
                    });
                    // client.emit('postMessage', {message:"inside"});
        
                });
                socket.current = client;   
            }
        })();
 
        return () => { socket.current.disconnect() }
    }, []);

    useEffect(() => {
        // 👇️ scroll to bottom every time messages change
        bottomRef.current?.scrollIntoView({behavior: 'smooth'});
    }, [messages]);

    const sendMessage =  ()=>{
        socket.current.emit('postMessage', {message: enteredMess});
        setEnteredMess("");
    }
    const inputHandler = (e)=>{
        setEnteredMess(e.target.value);
    }
    if (isLoading) {
        return <p>Loading posts...</p>;
      }
    
    if (isError.status) {
        return <Error>
                    {isError.message}
                </Error>
    }

    const formatTime = date => {
        if (moment(date).format('YYYY') != moment(new Date()).format('YYYY') ){
            return moment(date).format('MMMM Do YYYY')
        }
        return moment(date).format('h:mm A | MMMM Do')
    }
    return (
        <Card className={`${classes.cardChat}`}>
            <div className={`${classes.mesgs}`}>
                <div className={`${classes.groupName}`}>
                    {title}
                </div>
                <div className={`${classes.msg_history}`}>
                    {
                        messages.map(m => {
                            if (JSON.parse(localStorage.getItem('user')).userName == m.postedByUser.userName) {
                                return (
                                    <UserMessage key={m._id} time={formatTime(m.createdAt)}>
                                        {m.message}
                                    </UserMessage>
                                )
                            }
                            else {
                                return (
                                    <CommingMessage key={m._id} user={`${m.postedByUser.userName}`}  time={formatTime(m.createdAt)}>
                                        {m.message}
                                    </CommingMessage>
                                )
                            }
                        })
                    }
                    <div ref={bottomRef} />
                </div>

                <div className={`${classes.type_msg}`}>
                    <div className={`${classes.input_msg_write}`}>
                        <input type="text" placeholder="Type a message" value={enteredMess} onChange={inputHandler} className={`${classes.write_msg}`} />
                        <button className={`${classes.msg_send_btn}`} type="button" onClick={sendMessage}><FaTelegramPlane/></button>
                    </div>
                </div>
            </div>
        </Card>
    )
}
export default ChatRoom;