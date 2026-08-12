import express from "express"
import { createConversation,getConversation,updateConversation,saveMessage,getMessages } from "../controllers/chat.controller"

const router=express.Router()

router.get("/create-conversation",createConversation)
router.get("/get-conversation",getConversation);
router.post("/update-conversation/:conversationId",updateConversation)
router.post("save-message",saveMessage)
router.get("get-messages/:conversationId",getMessages);

export default router
