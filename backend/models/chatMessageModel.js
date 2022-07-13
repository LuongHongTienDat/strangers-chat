const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { uuidv4:v4 } = require("uuid");
const { aggregate } = require('./chatRoomModel');


// const MESSAGE_TYPES = {
//     TYPE_TEXT: "text",
//     TYPE_PHOTO: "photo",
//     TYPE_VIDEO: "video",
// };
  
const readByUserSchema = new Schema(
    {
        readByUserId: String,
        readAt:{
            type: Date,
            default: Date.now()
        }
    },
    {
        timestamps: false
    }
);

const chatMessageSchema = new mongoose.Schema(
    {

      roomTitle: String,
      message: String,
      // message: mongoose.Schema.Types.Mixed,
      // type: {
      //   type: String,
      //   default: () => MESSAGE_TYPES.TYPE_TEXT,
      // },
      postedByUser: mongoose.Schema.Types.ObjectID,
      // readByUsers: [readByUserSchema],
    },
    {
      timestamps: true,
      collection: "chatmessages",
    }
  );
  
  chatMessageSchema.statics.getMessagesFromRoom = async function (roomTitle, option={}){
      try{
        return await this.aggregate([
          // Select messages from this chatroom
          { $match: { roomTitle } },
          // Sort messages according to created time (from most recent)
          { $sort: { createdAt: -1 } },
          // Join this with user data
          {
            $lookup: {
              from: 'users',
              localField: 'postedByUser',
              foreignField: '_id',
              as: 'postedByUser'
            }
          }, 
          { $unwind: '$postedByUser' }, 
          // apply pagination
          // { $skip: options.page * options.limit },
          // { $limit: options.limit },
          { $sort: { createdAt: 1 } },
        ]) 
      }
      catch (error) {
          throw (error)
      }
  }

  chatMessageSchema.statics.postMessageToChatRoom = async function (roomTitle, message, postedByUser){
    const post = await this.create({
      roomTitle,
      message,
      postedByUser,
      // readByUsers: { readByUserId: postedByUser }
    });    
    const result = await this.aggregate([
      {$match: { _id: post._id } },
      // Join with user data
      {
        $lookup: {
          from: 'users',
          localField: 'postedByUser',
          foreignField: '_id',
          as: 'postedByUser',
        }
      },
      { $unwind: '$postedByUser' },
      // Join with chatroom data
      // {
      //   $lookup: {
      //     from: 'chatrooms',
      //     localField: 'chatRoomId',
      //     foreignField: '_id',
      //     as: 'chatRoomInfo',
      //   }
      // },
      // { $unwind: '$chatRoomInfo' },

      // { $unwind: '$chatRoomInfo.userIds' },

      // {
      //   $lookup: {
      //     from: 'users',
      //     localField: 'chatRoomInfo.userIds',
      //     foreignField: '_id',
      //     as: 'chatRoomInfo.userProfile',
      //   }
      // },
      // { $unwind: '$chatRoomInfo.userProfile' },
       {
        $group: {
          _id:  '$_id',
          roomTitle: { $last: '$roomTitle' },
          message: { $last: '$message' },
          // type: { $last: '$type' },
          postedByUser: { $last: '$postedByUser' },
          // readByUsers: { $last: '$readByUsers' },
          // chatRoomInfo: { $addToSet: '$chatRoomInfo.userProfile' },
          createdAt: { $last: '$createdAt' },
          updatedAt: { $last: '$updatedAt' },
        }
      }
    ])
    return result[0];
  }
  module.exports = mongoose.model('ChatMessage', chatMessageSchema);