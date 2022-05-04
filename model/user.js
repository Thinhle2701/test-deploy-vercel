const mongoose = require('mongoose');
const Schema = mongoose.Schema

const userSchema = new Schema({
    userid:{type: String,unique: true,required:true},
    account:{type:String,unique:true,required:true},
    password:{type:String,required: true},
    account_type: {type: String,required: true},
    point:{
        type:Number
   },
   email:{
       type: String, required:true
   }
})
module.exports = mongoose.model('user',userSchema)