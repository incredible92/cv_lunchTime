const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
   order:{
       type:String,
       required:true
   },
   userId:{
       type:mongoose.Schema.Types.ObjectId,
       ref:'User'
   }
},{timestamps:true});

module.exports = mongoose.model('Order', orderSchema);