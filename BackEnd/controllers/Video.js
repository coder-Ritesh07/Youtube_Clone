const { videos } = require("../models/Video")

// this is the video handle functions 

let upload=async(req,res)=>{
    try {
      let {title,description,videolink,thumbnail,videotype}=req.body
      let videoUpload=new videos({user:req.user._id,title,description,videolink,thumbnail,videotype})
      await videoUpload.save()
      res.status(200).json({messege:"Video Upload Successfully",videoUpload})
    
  } catch (error) {
    console.error(error)
    res.status(500).json({error:"Internal Server Error"})
  }
}

let getAllVideos=async(req,res)=>{
    try {
        let allvideos=await videos.find().populate('user','channelname username profileavtar createdAt')
        res.status(200).json({messege:"fetch Video Successfully",video:allvideos})
    } catch (error) {
        res.status(500).json({error:"Internal Server Error"})
    }
}

let getVideoById=async(req,res)=>{
    try {
        let VideobyId=await videos.findById(req.params.id).populate('user','channelname username profileavtar createdAt')
        if(!VideobyId)
        {
          return  res.status(404).json({messege:"Invalid Id"})
        }
        res.status(200).json({messege:"fetch Video Successfully",video:VideobyId})
    } catch (error) {
        console.error(error)
        res.status(500).json({error:"Internal Server Error"})
    }

}

let getVideoByUserid=async(req,res)=>{
    try {
        let useridd=req.params.userid
        let videouserid=await videos.find({user:useridd}).populate('user','channelname username profileavtar about createdAt')
        if(!videouserid){
            return  res.status(404).json({messege:"Invalid user video Id"})
        }
        res.status(200).json({messege:"fetch Video Successfully",videouserId:videouserid})
    } catch (error) {
        console.error(error)
        res.status(500).json({error:"Internal Server Error"})
    }
}

let deleteChannel=async(req,res)=>{
    try {
        let useridd=req.params.videoid
        console.log(useridd)
        let deleteChannel=await videos.findOneAndDelete({_id:useridd})
        if(!deleteChannel)
        {
           return res.status(404).json({error:"Channel Not Found"})
        }
        res.status(200).json({messege:"Channel Delete Successfully",deleteChannel:deleteChannel})
    } catch (error) {
        console.error(error)
        res.status(500).json({error:"Internal Server Error"})
    }
}

let serachVideos=async (req,res)=>{
   try {
    let { searchText } = req.body;
    let serachResult=await videos.find({$or: [
        { title: { $regex: searchText, $options: "i" } },
        { videotype: { $regex: searchText, $options: "i" } }
    ]}).populate('user','channelname username profileavtar about createdAt')
    if(serachResult.length===0)
    {
        return res.status(404).json({ messege: "No videos found" });
    }
    res.status(200).json({messege:"Search Data Successfully",videoSearch:serachResult})
    console.log(serachResult)
   } catch (error) {
    console.error(error)
    res.status(500).json({error:"Internal Server Error"})
   }
}

module.exports={
    upload,
    getAllVideos,
    getVideoById,
    getVideoByUserid,
    serachVideos,
    deleteChannel
}