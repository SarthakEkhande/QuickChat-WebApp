const router = require('express').Router();

const Chat = require("./../models/chat")
const Message = require("./../models/message.js")

const authMiddleware= require('./../middlewares/authMiddleware.js');
const message = require('./../models/message.js');

router.post('/new-messages',authMiddleware,async(req,res)=>{
    try{
      //store message in database
   const newMessage=await   new Message(req.body)
   const saveMessage = await newMessage.save()

      //update last message in chat collection 
    //   const currentChat=await Chat.findById(req.body.chatId)
    //   currentChat.lastmessage =saveMessage._id
    //  await currentChat.save()

       const currentChat=await Chat.findOneAndUpdate({_id:req.body.chatId},{
        lastmessage :saveMessage._id,
        $inc : {unreadmessagecount:1}
       })


        res.status(201).send({
             message:"Message Send successfully",
             success:true,
             data:saveMessage
        })

    }catch(error){
        res.status(400).send({
            message:error.message,
            success:false
        })
    }
})

router.get("/get-all-messages/:chatId",authMiddleware,async(req,res)=>{
   try{

    const allMessages = await Message.find({chatId: req.params.chatId}).sort({created : 1})

    res.send({message:"messages fetch Successfully",
        success:true,
        data : allMessages
    }

    )

   }catch(error){
    res.status(400).send({message:error.message,
        success:false
    })
   }
})

module.exports = router