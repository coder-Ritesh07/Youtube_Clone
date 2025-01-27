const express=require('express')
const { signup, signin, signout, deleteUserChannel, userInformation } = require('../controllers/User')
const { jwtAuthentication } = require('../middleware/Auth')

let userRouter=express.Router()


// defined the endPoints and handle the user routes here
userRouter.post('/signup',signup)
userRouter.post('/login',signin)
userRouter.post('/logout',signout)
userRouter.get('/userinfo/:userid',userInformation)
userRouter.delete('/:userid',jwtAuthentication,deleteUserChannel)

module.exports={
    userRouter
}