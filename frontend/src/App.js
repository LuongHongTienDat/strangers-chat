import './App.css';
// import {useState, useEffect} from 'react'
// import io from 'socket.io-client';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import ChatRoom from './Pages/ChatRoom/ChatRoom';
import Profile from './Pages/Profile/Profile';
function App() {
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
          <Route path="/" element={<Home />} />
          <Route path="/chatroom/:title" element={<ChatRoom />} />
          <Route path="/profile" element={<Profile/>} />
  </Routes>
  );
}

export default App;
