const mongoose = require('mongoose')

const userInfoType = {
    type:String,
    required:true
}

const userSchema = new mongoose.Schema({
    userInfo: {
        userId:userInfoType,
        username:userInfoType
    },
    email: String,
    phoneNumber: Number
},{timestamps:true})

module.exports = mongoose.model('User', userSchema);