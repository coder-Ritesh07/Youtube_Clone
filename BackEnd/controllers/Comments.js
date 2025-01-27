const { comments } = require("../models/Comment");
let userComments = async (req, res) => {
  try {
    let { video, usercomments } = req.body;
    let addcomment = new comments({ user: req.user._id, video, usercomments });
    await addcomment.save();
    res
      .status(200)
      .json({ messege: "Comment Upload Successfully", addcomment });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

let getCommentById = async (req, res) => {
  try {
    let videoId = req.params.videoid;
    console.log(videoId);
    let allusercomment = await comments
      .find({ video: videoId })
      .populate("user", "channelname username profileavtar createdAt");
    // console.log(allusercomment)
    res
      .status(200)
      .json({ messege: "fetch Comment Successfully", allusercomment });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

let editComments = async (req, res) => {
  try {
    let cmtId = req.params.commentid;
    let updatedData = req.body; // Get the updated comment data from the request body

    // Find the comment by ID and update it with the new data
    let editcmt = await comments.findOneAndUpdate(
      { _id: cmtId }, // Filter by comment ID
      updatedData, // New data for the update
      { new: true } // Return the updated document
    );

    if (!editcmt) {
      return res.status(404).json({ message: "Comment not found" });
    }

    res
      .status(200)
      .json({ message: "Comment updated successfully", comment: editcmt });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

let deleteComment=async (req,res)=>{
  try {
    let cmtId = req.params.commentid;
    let deletecmt=await comments.findOneAndDelete({_id:cmtId})
    if(!deleteComment)
    {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.status(200).json({message:"Comment Deleted Successfully",delete:deletecmt})
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  userComments,
  getCommentById,
  editComments,
  deleteComment
};
