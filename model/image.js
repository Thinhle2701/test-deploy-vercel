const mongoose = require('mongoose');
const Schema = mongoose.Schema

const imageSchema = new Schema({
   img_id:
   {
       type:Number,
       required:true
   },

   img_question:
   {
       type:String,
       required:true
   },
   img_url:
   {
        type: String,
        required : true
   },
   img_result:
   {
        type: String,
        required:true
   }

})
module.exports = mongoose.model('image_question',imageSchema)