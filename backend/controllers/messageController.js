const asyncHandler = require('express-async-handler')
const ChatRoom = require('../models/chatRoomModel');
const User = require('../models/userModel');
const Message = require('../models/chatMessageModel');

class MessageController {

//  [ GET - ROUTE: api/message ]
    getMessagesFromRoom = asyncHandler( async (req,res) => {
        if (! await ChatRoom.hasJoinedRoom(req.query.title,req.user._id)){
            res.status(400);
            throw new Error('You have not joined this room!');            
        }
        res.json(await Message.getMessagesFromRoom(req.query.title));
    })
    

}
module.exports = new MessageController;
