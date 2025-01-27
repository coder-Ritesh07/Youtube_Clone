const mongoose=require('mongoose')

// this is the schema of user
let userSchema=new mongoose.Schema({
    channelname:{
        type:String,
        require:true,
    },
    username:{
        type:String,
        require:true,
        unique:true,
    },
    password:{
        type:String,
        require:true,
        unique:true,
    },
    about:{
        type:String,
    },
    profileavtar:{
        type:String,
    }
},{timestamps:true})

let users=mongoose.model('user',userSchema)

module.exports={
    users
}