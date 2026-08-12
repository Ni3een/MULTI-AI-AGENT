import { getAuth } from "firebase-admin/auth";
import redis from "../../redis/redis.js";
import {User} from "../models/user.model.js"
export const login=async(req,res)=>{
    try{
        const {token}=req.body;
        const decoded=getAuth(app).verifyIdToken(token);

        let user=await User.findOne({
            firebaseUid:decoded.uid // uid is unique for everyone so
        })
        if(!user){
            user=await User.create({
                firebaseUid:(await decoded).uid,
                name:decoded.name,
                email:decoded.email,
                avatar:decoded.picture,
            })
        }
        const sessionId=crypto.randomUUID();  // random sessionuid

        /// redis mein store krdo ishe
        await redis.set(`session:${sessionId}`,JSON.stringify({
            userId:user._id,
            name:user.name,
            email:user.email,
            avatar:user.avatar
        }),"EX",7*24*60*60)
        res.cookie("session",sessionId,{
            httpOnly:true,
            secure:false,
            sameSite:"strict",
            maxAge:7*24*60*60*1000 //7 days
        })
        return res.status(200).json(user);
    }
    catch(error){
        return res.status(500).json({message:"Login failed", error:error.message})
    }
}


export const logOut=async(req,res)=>{
    try{
         const session=req.cookies?.session
         await redis.del(`session:${session}`)
         res.clearCookie("session")
         return res.status(200).json({message:"Logged out successfully"})
    }
    catch(error){
        return res.status(500).json({message:"Logout failed", error:error.message})
    }
}