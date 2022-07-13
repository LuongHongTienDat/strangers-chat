const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require ("bcryptjs");

const userSchema = new Schema({
    userName:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true
    },
    roleUser:{
        type:String,
        require:true
    },

});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};
  
module.exports = mongoose.model('User', userSchema);