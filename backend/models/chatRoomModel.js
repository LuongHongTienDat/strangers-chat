const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const chatRoomSchema = new Schema(
    {
      title: String,
      userIds: Array,
    },
    {
        timestamps: true,
        collection: "chatrooms"
    }
);

chatRoomSchema.statics.getRoomsOfAUser = async function (userId){
  try{
    return await this.aggregate([
      { $unwind: '$userIds' }, 
      { $match: { userIds: userId } }
    ]) 
  }
  catch (error) {
      throw (error)
  }
}

chatRoomSchema.statics.hasJoinedRoom = async function (title, userId){
  try{
    const result = (await this.aggregate([
      { $match: { title }},
      { $unwind: '$userIds' }, 
      { $match: { userIds: userId} },
    ]))
    return result.length!=0
  }
  catch (error) {
      throw (error)
  }
}
module.exports = mongoose.model('ChatRoom', chatRoomSchema);