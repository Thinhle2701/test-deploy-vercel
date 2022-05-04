const mongoose = require('mongoose');
const Schema = mongoose.Schema

const voiceQuestionSchema = new Schema({
   voice_id:
   {
       type:Number,
       required:true
   },
   voice_result:
   {
        type: String,
        required:true
   }
})
module.exports = mongoose.model('voice_question',voiceQuestionSchema)