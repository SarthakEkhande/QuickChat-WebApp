const router = require('express').Router();

const Chat = require("./../models/chat")
const authMiddleware= require('./../middlewares/authMiddleware.js')
const Message = require("./../models/message.js")

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
   const allchats =await Chat.find({members:{$in:userId}}).populate('members').
   populate('lastmessage').
   sort({updatedAt:-1})

    
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

router.post('/clear-unread-message',authMiddleware,async(req,res)=>{
    try{
        const chatId=req.body.chatId
        const chat=await Chat.findById(chatId)
        if(!chat){
            res.send({
                message:"No chat found with given chat ID",
                success:false
            })
        }

        const updatedChat= await Chat.findByIdAndUpdate(
            chatId,
            {unreadmessagecount : 0},
            {new:true}
        ).populate('members').populate('lastmessage')


        await Message.updateMany(
            {chatId:chatId,read:false},
            {read:true}
        )

        res.send({
            message:"Unread message cleared successfully",
            success:true,
            data:updatedChat
        })

    }catch(error){
        res.send({
            message:error.message,
            success:false
        })
    }

})
module.exports =router