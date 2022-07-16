import './App.css';
// import {useState, useEffect} from 'react'
// import io from 'socket.io-client';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import Home from './Pages/Home/Home';
import ChatRoom from './Pages/ChatRoom/ChatRoom';
import Profile from './Pages/Profile/Profile';
import AuthContext from './store/auth-context';
function App() { 
  const authCtx = useContext(AuthContext);
  // const [socket, setSocket] = useState(null);

  // useEffect(() => {
  //   var newSocket = io('http://localhost:5000', {
  //     withCredentials: true,
  //     extraHeaders: {
  //       "my-custom-header": "abcd"
  //     }
  //   });
  //   //setSocket(newSocket);
  //   newSocket.on('dat', (msg)=>{
  //     console.log(msg)
  //   });

  //   return () => newSocket.close();
  // }, [setSocket]);

  return (
    <Routes>
          {authCtx.isLoggedIn && 
              <>
                <Route path="/profile" element={<Profile/>} />
                <Route path="/chatroom/:title" element={<ChatRoom />} />
                <Route path="/" element={<Navigate to="/profile" replace />} />
              </>
          }
          {!authCtx.isLoggedIn && 
              <>
                <Route path="/" element={<Home />} />
                <Route path="/*" element={<Navigate to="/" replace />} />
              </>
          }
  </Routes>
  );
}

export default App;
