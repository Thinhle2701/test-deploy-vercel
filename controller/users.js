const express =  require('express')
const router = express.Router()
const user = require('../model/user')
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const req = require('express/lib/request')



// const createadmin = async ()=>{
//     const adpassword = "admin"
//     const adminpassword = await argon2.hash(adpassword)
//     const useradmin = new user({
//     id:1,
//     Account:"admin",
//     Password:adminpassword
// })
// useradmin.save()
// }

router.post('/add_admin',async(req,res)=>{

    const {account,password,email}= req.body
    let countAdmin = await user.countDocuments({account_type:"Admin"})
    if(!countAdmin)
    {
        newId="AD_01"
    }
    if(countAdmin < 9)
    {
        countAdmin++
        newId = "AD_0" + countAdmin
    }
    else
    {
        countAdmin++
        newId = "AD_" + countAdmin
    }

    try {
        const adpassword = password
        const adminpassword = await argon2.hash(adpassword)
        const useradmin = new user({
        userid:newId,
        account:account,
        password:adminpassword,
        account_type:"Admin",
        point: 100,email:email})
        await useradmin.save()
        res.json({success:true,message:"Create user successfully"})

    }
    catch(err){
        console.log(err);

    }
})





router.get('/',async (req,res) =>{

    try{
        const result = await user.find();
        res.send(result);
    }
    catch(err)
    {
        console.log(err.message);
    }

});

router.post('/add_user_player' ,async(req,res) =>{
    const {account,password,email}= req.body
    let countUser = await user.countDocuments({account_type:"User"})
    if(!countUser)
    {
        newId="User_01"
    }
    if(countUser < 9)
    {
        countUser++
        newId = "User_0" + countUser
    }
    else
    {
        countAdmin++
        newId = "User_" + countUser
    }
    // try 
    // {
    //     const newUser = new user({id,account,password,point})
    //     await newUser.save()
    //     res.json({success:true,message:"Create user successfully"})
    // }
    // catch(err)
    // {
    //     console.log(err.message)
    //     res.status(400).json({success:false,message:"not successs"})
    // }


    try {
        const temppassword = password
        const hashpassword = await argon2.hash(temppassword)
        const new_user = new user({
        userid:newId,
        account: account,
        password:hashpassword,
        account_type : "User",
        point: 0,
        email:email})
        await new_user.save()
        res.json({success:true,message:"Create user successfully"})

    }
    catch(err){
        console.log(err);

    }

});

router.get('/:id',async (req,res) =>{
    const id = req.params.id;
    try{
        const result = await user.findOne({userid : id});
        if (result)
        {
            res.send(result);
        }
        else
        {
            throw new Error("not exist user id");
        }

    }
    catch(err)
    {
        console.log(err.message);
        res.send(err.message);
    }

});

router.post('/login',async function login(req,res)
{
    const {account,password}= req.body
    if(!account||!password)
    {
        return res.status(400).json({success:false,message:"Missing user name or password"})
    }
    try
    {
        const User = await user.findOne({account})
        if(!User)
        {
            return res.status(400).json({success:false,message:'Incorrect user name or password'})
        }
        const passwordValid = await argon2.verify(User.password,password)
        if(!passwordValid)
        {
            return res.status(400).json({success:false,message:'Incorrect user name or password'})
        }

        res.send(User)




    }
    catch(error) {
        console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
    }
})

router.put('/update_point/:id',(req,res) => {
    var id = req.params.id;
    user.findOne({userid : id},function(err,foundObject){
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
                if (req.body.point)
                {
                    foundObject.point = req.body.point;

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
                        console.log(updatedObject)
                    }
                })

            }
        }
    })
    
}) 

router.put('/edit/:id', function (req, res,next) {
    user.findByIdAndUpdate({userid : req.params.id},req.body).then(function()
    {
        user.findOne({userid: re.params.id}).then(function(user){
            res.send(user);
        })
    })

}); 




module.exports = router