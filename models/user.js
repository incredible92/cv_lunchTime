const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type:string, 
        unique: true
    },
    email: "string",
    order:   String,
    date: { 
        type: Date,
        default: Date.now 
        },
    comments: [
        { 
            message: String, 
            date: Date 
        }
    ],
    phoneNumber: number
},{timestamps:true})

module.exports = User= mongoose.model('user', userSchema);