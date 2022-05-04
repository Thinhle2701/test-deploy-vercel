const express =  require('express')
const router = express.Router()
const voice = require('../model/voice')
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const req = require('express/lib/request')
const res = require('express/lib/response')


router.get('/',async (req,res) =>{

    try{
        const result = await voice.find();
        res.send(result);
    }
    catch(err)
    {
        console.log(err.message);
    }

});

router.post('/add_voice' ,async(req,res) =>{


    const {voice_result}= req.body
    try 
    {
        const maxId = await voice.find().sort({voice_id:-1}).limit(1)
        const newId =(maxId[0].voice_id)+1 
        console.log("new id image : ",newId)
        const newVoiceQues = new voice({voice_id:newId,voice_result})
        await newVoiceQues.save()
        res.json({success:true,message:"Create voice question successfully"})
    }
    catch(err)
    {
        console.log(err.message)
        res.status(400).json({success:false,message:"not successs"})
    }


});

router.get("/:id",async(req,res)=>
{
    const id = req.params.id;
    try{
        const result = await voice.findOne({voice_id : id});
        if (result)
        {
            res.send(result);
        }
        else
        {
            throw new Error("not exist question id");
        }

    }
    catch(err)
    {
        console.log(err.message);
        res.send(err.message);
    }
})

module.exports = router
