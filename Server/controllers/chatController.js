const router = require('express').Router();

const Chat = require("./../models/chat")
const authMiddleware= require('./../middlewares/authMiddleware.js')

router.post('/create-new-chat',authMiddleware,async(req,res)=>{
    try{
   const chat = new Chat(req.body)

     const saveChat=  await  chat.save()
     res.status(201).send({message:"Chat created successfully",
        success:true,
        data:saveChat
     })
    }catch(error){
        res.status(400).send({
             message:error.message,
             success:false
        })
    }
     
})
router.get('/get-all-chat',authMiddleware,async(req,res)=>{
    try{
         const userId=req.user.id
   const allchats =await Chat.find({members:{$in:userId}}).populate('members').sort({updatedAt:-1})

    
     res.status(200).send({message:"Chat fetch successfully",
        success:true,
        data:allchats
     })
    }catch(error){
        res.status(400).send({
             message:error.message,
             success:false
        })
    }
     
})

module.exports =router