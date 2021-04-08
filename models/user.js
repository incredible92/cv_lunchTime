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
    comments: [
        { 
            message: String, 
            date: Date 
        }
    ],
    phoneNumber: number
},{timestamps:true})

module.exports = mongoose.model('User', userSchema);