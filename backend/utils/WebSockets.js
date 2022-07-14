const ChatMessage = require('../models/chatMessageModel');
const User = require('../models/userModel');
const ChatRoom = require('../models/chatRoomModel');
const jwt = require('jsonwebtoken');
class WebSockets {
  users = [];
  connection(client) {
    const {title} = client.handshake.auth;
    const {_id} = client.handshake.auth.user;
    client.join(title)

    // event fired when the chat room is disconnected
    client.on("disconnect", (reason) => {
        // this.users = this.users.filter((user) => user.socketId !== client.id);
    });
    io.on("error", (error) => {
      console.log(`error: `,error);
        // this.users = this.users.filter((user) => user.socketId !== client.id);
    });
    client.on("postMessage", async ({message}) => {
        const result = await ChatMessage.postMessageToChatRoom(title,message,_id);
        // console.log(`message ${client.id}`);
        // console.log(client.rooms);

        io.in(title).emit("receiveMessage", result);
    });
    // add identity of user mapped to the socket id
    client.on("identity", (userId) => {
      this.users.push({
        socketId: client.id,
        userId: userId,
      });
    });

  }


  async socketAuth(client,next){
    try {
      const {token, title} = client.handshake.auth;
      if (!token) {
        throw new Error('Not authorized, token failed') ;              
      }
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

      if (await ChatRoom.hasJoinedRoom(title, decodedToken._id)){
        client.handshake.auth.user=decodedToken;
        next()
      } else {
        next(new Error('Authentication error'));
      }
    }
    catch {
        throw new Error('Not authorized, token failed') ;              
    }
  }

  // subscribeOtherUser(room, otherUserId) {
  //   const userSockets = this.users.filter(
  //     (user) => user.userId === otherUserId
  //   );
  //   userSockets.map((userInfo) => {
  //     const socketConn = global.io.sockets.connected(userInfo.socketId);
  //     if (socketConn) {
  //       socketConn.join(room);
  //     }
  //   });
  // }
}

module.exports = new WebSockets();
