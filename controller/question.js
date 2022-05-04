const express =  require('express')
const router = express.Router()
const question = require('../model/question')




router.get('/',async (req,res) =>{

    try{
        const result = await question.find();
        res.send(result);
    }
    catch(err)
    {
        console.log(err.message);
    }

});

router.get('/:id',async (req,res) =>{
    const id = req.params.id;
    try{
        const result = await question.findOne({question_id : id});
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

});
/*    const {question_id,question_name,answerA,answerB,answerC,answerD,result}= req.body*/

router.post('/addquestion' ,async(req,res) =>{


    const {question_name,answerA,answerB,answerC,answerD,result}= req.body
    try 
    {
        const maxId = await question.find().sort({question_id:-1}).limit(1)
        const newId =(maxId[0].question_id)+1 
        console.log(maxId)
        const newQuestion = new question({question_id:newId,question_name,answerA,answerB,answerC,answerD,result})
        await newQuestion.save()
        res.json({success:true,message:"Create question successfully"})
    }
    catch(err)
    {
        console.log(err.message)
        res.status(400).json({success:false,message:"not successs"})
    }


});



module.exports= router