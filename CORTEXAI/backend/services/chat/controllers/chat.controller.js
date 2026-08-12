import Conversation from "../models/conversation.model.js"
import Message from "../models/message.model"

export const createConversation=async(req,res)=>{
    try{
        const userId=req.headers["x-user-id"]
        console.log("userId",userId)
        const conversation=await Conversation.create({
            userId:userId
        })
        return res.status(200).json(conversation)
    }catch(error){
        return res.status(500).json({message:"error in creating conversation"})
    }   
}
export const getConversation=async(req,res)=>{
    try{
        const userId=req.headers["x-user-id"]
        console.log("userId",userId)
        const conversation=await Conversation.find({
            userId:userId
        }).sort({createdAt:-1})

        return res.status(200).json(conversation)
    }catch(error){
        return res.status(500).json({message:"error in getting conversation"})
    }   
}

export const saveMessage=async(req,res)=>{
    try{
        const {conversationId,role,content}=req.body
        const message=await Message.create({
            conversationId,
            role,
            content
        })
        return res.status(200).json(message)

    }catch(error){
        return res.status(500).json({message:"error in saving message"})
    }
}

export const getMessages=async(req,res)=>{
    try{
        const {conversationId}=req.body
        const message=await Message.find({
            conversationId:req.params.conversationId,
        }).sort({createdAt:-1})
        return res.status(200).json(message)

    }catch(error){
        return res.status(500).json({message:"error in saving message"})
    }
}


export const updateConversation=async (req,res) => {
  try {
    const {id,title}=req.body
    const conversations=await Conversation.findByIdAndUpdate(id,{title})
    return res.status(200).json(conversations)
  } catch (error) {
    return res.status(500).json({message:`get conversation error ${error}`})
  }
}