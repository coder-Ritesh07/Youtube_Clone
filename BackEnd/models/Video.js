const mongoose=require('mongoose')

// this is the video schema of user
let videoShema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        require:true,
    },
    title:{
        type:String,
        require:true,
    },
    description:{
        type:String,
    },
    videolink:{
        type:String,
        require:true,
    },
    thumbnail:{
        type:String,
        require:true
    },
    videotype:{
        type:String,
    },
    like:{
        type:String,
        default:"1k"
    },
    dislike:{
         type:String,
        default:0
    }

},{timestamps:true})

let videos=mongoose.model('video',videoShema)

module.exports={
    videos
}