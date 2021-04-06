const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type:string, 
        unique: true
    },
    email: "string",
    body:   String,
    date: { 
        type: Date,
        default: Date.now 
        },
    comments: [
        { 
            body: String, 
            date: Date 
        }
    ],
    phoneNumber: number
})

module.exports = mongoose.model('user', userSchema);