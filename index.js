const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const app = express();
const https = require('https');
const { Int32 } = require('mongodb');
const favicon = require('serve-favicon');
const question = require('./model/question')
const user = require('./model/user')
const image = require('./model/image')
const voice = require('./model/voice')

const mongoose = require('mongoose');
const { stringify } = require('querystring');
const { Router } = require('express');



mongoose.connect('mongodb+srv://thinh:123@cluster0.ydjcp.mongodb.net/question',(err)=>
{
    if (!err) console.log('db connected')
    else console.log('db error')
})



// const NewSchema = new mongoose.Schema({
//     questionID : Number,
//     questionName: String,
//     answerA : String,
//     answerB : String,
//     answerC : String,
//     answerD : String,
//     result: String
// });


// const mongo_uri = 'mongodb+srv://thinhbeo:thinhbeo2801@newcluster.97rhp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
// const newModel = new mongoose.model("colection",NewSchema)

// const newModel = new mongoose.model("question",NewSchema)


// const data = async() =>{
//     const result = await newModel.insertMany([{task_id : 1, name_task : "task 1"},
//     {task_id : 2, name_task : "task 2"}])
//     console.log(result);
// }
// data();
app.use(express.json());

// const Task = [
//     {id : 0,name : 'Task 0'},
//     {id : 1,name : 'Task 1'},
//     {id : 2,name : 'Task 2'},
//     {id : 3,name : 'Task 3'},
//     {id : 4,name : 'Task 4'},
//     {id : 5,name : 'Task 5'}
// ];











app.get('/api/Task',(req,res) =>{

    newModel.find().then((result)=>{
        res.send(result);
    }).catch((err)=>{
        console.log(err)
    })

});


// app.get('/api/Task/:id',(req , res) => {
//     const test = newModel.find(t => t.questionID === parseInt(req.params.id));
//     if (!test) res.status(404).send('Not found');
//     res.send(task_new);
// });













app.get('/:id',(req,res) =>{
    question.findOne({"question_id" : req.params.id}).then((result)=>{
        if (!result)
        {
            
             res.status(404).send('Not found');
        }
        else{
            res.send(result);
        }

    })
    .catch((err) => console.log(err))

    

})




app.put('/api/Task/edit/:id',(req,res) => {
    var id = req.params.id;
    newModel.findOne({task_id : id},function(err,foundObject){
        if (err)
        {
            console.log(err);
            res.status(500).send();
        }
        else{
            if (!foundObject)
            {
                res.status(404).send();
            }
            else{
                if (req.body.name_task)
                {
                    foundObject.name_task = req.body.name_task;
                }

                foundObject.save(function(err,updatedObject)
                {
                    if (err)
                    {
                        console.log(err);
                        res.status(500).send();
                    }
                    else{
                        res.send(updatedObject);
                    }
                })

            }
        }
    })
    
}) 





app.delete('/api/Task/delete/:id',(req,res) => {
    //array
    // const task_del = Task.find(t => t.id === parseInt(req.params.id));
    // if (!task_del) res.status(404).send('Not found');

    // const index = Task.indexOf(task_del);
    // Task.splice(index,1);
    
    // res.send(task_del);


    newModel.deleteOne({task_id : req.params.id},(err,result)=>
    {
        if (err) throw err
        res.send("this task is deleted")
    })

})


const questionRouter = require(__dirname+'/controller/question')
app.use('/api/question',questionRouter)

const userRouter = require(__dirname+'/controller/users')
app.use('/api/user',userRouter)


const imageRouter = require(__dirname+'/controller/image')
app.use('/api/image',imageRouter)

const voiceRouter = require(__dirname+'/controller/voice')
app.use('/api/voice',voiceRouter)

const PronunciationRouter = require(__dirname+'/controller/external_api.js')
app.use('/api/find_word',PronunciationRouter)

app.use(favicon(__dirname + '/favicon.ico'));
app.get('/', (_, res)=> res.sendFile(__dirname + '/index.html'))


app.listen(3000,() => console.log('Listening Port 3000'));



