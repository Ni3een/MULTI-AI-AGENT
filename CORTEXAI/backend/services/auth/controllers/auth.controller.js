import { getAuth } from "firebase-admin/auth";

export const login=async(req,res)=>{
    try{
        const {token}=req.body;
        const decoded=getAuth(app).verifyIdToken(token);

        const user=await User.findOne({
            firebaseUid:decoded.uid
        })
        if(!user){
            user=await User.create({
                firebaseUid:(await decoded).uid,
                name:decoded.name,
                email:decoded.email,
                avatar:decoded.picture,
            })
        }

    }
    catch(error){
        return res.status(500).json({message:"Login failed", error:error.message})
    }
}