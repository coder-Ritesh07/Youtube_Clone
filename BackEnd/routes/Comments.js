const express=require('express')
const { userComments, getCommentById, editComments, deleteComment } = require('../controllers/Comments');
const { jwtAuthentication } = require('../middleware/Auth');
let commentRouter=express.Router()

// handle the user comments Routes here 
commentRouter.post('/usercomment',jwtAuthentication,userComments);
commentRouter.get('/usercomment/:videoid',getCommentById);
commentRouter.put('/usercomment/:commentid',jwtAuthentication,editComments);
commentRouter.delete('/usercomment/:commentid',jwtAuthentication,deleteComment)

module.exports={
    commentRouter,
}