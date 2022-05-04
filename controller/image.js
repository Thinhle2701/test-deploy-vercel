const express =  require('express')
const router = express.Router()
const image = require('../model/image')
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const req = require('express/lib/request')
const res = require('express/lib/response')

router.get('/',async (req,res) =>{

    try{
        const result = await image.find();
        res.send(result);
    }
    catch(err)
    {
        console.log(err.message);
    }

});

router.post('/add_image' ,async(req,res) =>{


    const {img_question,img_url,img_result}= req.body
    try 
    {
        const maxId = await image.find().sort({img_id:-1}).limit(1)
        const newId =(maxId[0].img_id)+1 
        console.log("new id image : ",newId)
        const newImgQues = new image({img_id:newId,img_question,img_url,img_result})
        await newImgQues.save()
        res.json({success:true,message:"Create Image question successfully"})
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
        const result = await image.findOne({img_id : id});
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


router.get("/:url",async(req,res)=>
{
    const temp = req.params.img_url
    try
    {

        const result = await image.find({img_url:temp})
        if (result)
        {
            res.send(result)
            console.log(result)
        }
        else
        {
            throw new Error("not exist ");
        }

    }
    catch(err)
    {
        console.log(err.message)
        res.status(400).json({success:false,message:"not exist"})
    }
})

module.exports = router