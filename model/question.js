const mongoose = require('mongoose');
const Schema = mongoose.Schema

const questionSchema = new Schema({
   question_id:{
        type:Number,
        unique:true,
        required:true
   },
   question_name:
   {
       type:String,
       unique:true,
       required:true
   },
   answerA:
   {
        type:String,
        required:true
   },
   answerB:
   {
        type:String,
        required:true
   },
   answerC:
   {
        type:String,
       
        required:true
   },
   answerD:
   {
        type:String,
        required:true
   },
   result:
   {
        type:String,
        required:true
   },

})
module.exports = mongoose.model('question',questionSchema)