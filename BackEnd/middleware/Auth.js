const jwt=require('jsonwebtoken')
require('dotenv').config();
const { users } = require("../models/User")

const JWT_SECRETKEY=process.env.JWT_SECRETKEY

// this is the JWT Authentication function
async function jwtAuthentication(req,res,next){
    let token=req.cookies.token;
    if(!token){
       return res.status(404).json({error:"Token not found,Authorization denied"})
    }
    try {
        let decode=jwt.verify(token,JWT_SECRETKEY)
        req.user=await users.findById(decode.userId).select("-password")
        if (!req.user) {
            return res.status(404).json({ error: "User not found" });
        }
        next()
    } catch (error) {
        console.error(error)
        res.status(404).json({messege:"Invalid Token"})
    }
    
}

// This is the generate token from user 
function generateTokens(userdata) {
    // console.log('Userdata:', userdata); // Log the entire userdata object
    return jwt.sign({ userId: userdata._id}, JWT_SECRETKEY, { expiresIn: '24hr' });
}

module.exports={
    jwtAuthentication,
    generateTokens,
}