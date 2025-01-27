const mongoose=require('mongoose')
// this is the schema of the comment 
let commentSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    video:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"video"
    },
    usercomments:{
        type:String,
    }
})

let comments=mongoose.model('comments',commentSchema)

module.exports={
    comments
}