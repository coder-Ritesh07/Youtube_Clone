const { generateTokens } = require("../middleware/Auth")
const { users } = require("../models/User")
const bcrypt=require('bcrypt')

const cookieOption={
    httpOnly:true,
    sequre:false,
    sameSite:'Lax'
}

// this is the handle user functions

const signup=async(req,res)=>{
 try {
    let {channelname,username,password,about,profileavtar}=req.body
    let userExist=await users.findOne({username})
    console.log(userExist)
    if(userExist)
    {
      return res.status(400).json({error:"User Already exist"})
    }
    let securepassowrd=await bcrypt.hash(password,10)
    console.log(securepassowrd)
    let newuser= new users({channelname,username,password:securepassowrd,about,profileavtar})
     await newuser.save()
     res.status(200).json({messege:"User Registered Successfully",newuser:newuser})
    
 } catch (error) {
    res.status(500).json({error:"Internal Server Error"})
 }
}

const signin=async(req,res)=>{
    try {

        let {username,password}=req.body
        let user=await users.findOne({username})
        if(user&& await bcrypt.compare(password,user.password))
        {
            // console.log(user)
            let tokens=generateTokens(user);
            res.cookie('token',tokens,cookieOption)
            res.status(200).json({messege:"User Login Successfully",tokens,user})
        }else{
            res.status(404).json({error:"Invalid Credentials"})
        }
        
    } catch (error) {
        res.status(500).json({error:"Internal Server Error"})
        console.error(error)
    }
}

const signout=async(req,res)=>{
    res.clearCookie('token',cookieOption).status(200).json({messege:"User Logout Successfully"})
}

const deleteUserChannel=async(req,res)=>{
   try {
    let userid=req.params.userid
    console.log(userid)
    let deleteChannel=await users.findOneAndDelete({_id:userid})
    if(!deleteChannel){
       return res.status(404).json({messege:"Channel Not Found"})
    }
    res.status(200).json({messege:"Delete Channel Successfully"})
   } catch (error) {
    res.status(500).json({error:"Internal Server Error"})
   }
}

const userInformation=async(req,res)=>{
    try {
        let userid=req.params.userid
        // console.log(userid)
        let getuserdata=await users.find({_id:userid})
        if(!getuserdata)
        {
           return res.status(404).json({messege:"User Not Found"})
        }
        res.status(200).json({messege:"User Channel Successfully",userdata:getuserdata})
    } catch (error) {
        res.status(500).json({error:"Internal Server Error"})
    }
}

module.exports={
    signup,
    signin,
    signout,
    userInformation,
    deleteUserChannel
}