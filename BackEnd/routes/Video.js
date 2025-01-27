const express=require('express')
const { upload, getAllVideos, getVideoById, getVideoByUserid, deleteChannel, serachVideos } = require('../controllers/Video');
const { jwtAuthentication } = require('../middleware/Auth');
let videoRouter=express.Router()

// handle the  videos routes
videoRouter.post('/upload',jwtAuthentication,upload);
videoRouter.get('/allvideos',getAllVideos);
videoRouter.get('/watch/:id',getVideoById)
videoRouter.get('/watch/channel/:userid',getVideoByUserid)
videoRouter.delete('/watch/channel/:videoid',jwtAuthentication,deleteChannel)
videoRouter.post('/search',serachVideos)

module.exports={
    videoRouter
}