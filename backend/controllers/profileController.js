const asyncHandler = require('express-async-handler')
const ChatRoom = require('../models/chatRoomModel');
const User = require('../models/userModel');

class ProfileController {

//  [ GET - ROUTE: api/profile ]
    getJoinedRooms = asyncHandler( async (req,res) => {
        res.json(await ChatRoom.getRoomsOfAUser(req.user._id));
    })

//  [ POST - ROUTE: api/profile/join ]
    joinRoom = asyncHandler( async (req,res) => {
        const {title} =  req.body
        const room = await ChatRoom.findOne({title});
        if (room) {
            if (await ChatRoom.hasJoinedRoom(title,req.user._id)) {
                res.status(400);
                throw new Error('You have already joined this room!');          
            }
            room.userIds.push(req.user._id);
            await room.save();
        } else {
           await ChatRoom.create({title, userIds:[req.user._id]})
        }
        res.json(await ChatRoom.findOne({title}));
    })

}

module.exports = new ProfileController;
