const express=require('express')
const {userRouter}=require('./routes/User')
const cookieParser=require('cookie-parser')
const { jwtAuthentication } = require('./middleware/Auth')
const cors=require('cors')

// connect to the database
const mongoose=require('mongoose');
const { videoRouter } = require('./routes/Video');
const { commentRouter } = require('./routes/Comments');

// connect the with mongodb server
mongoose.connect('mongodb+srv://ritesh:Ritesh123@cluster0.0zvkn.mongodb.net/Youtube-Clone');

let db=mongoose.connection

db.on('open',()=>{
    console.log("Database Connection successfully")
})

db.on('error',()=>{
    console.log("Something went wrong")
})

const app=express()

// connect the frontEnd and Backend Here by using the cors
const allowedOrigins = [
    'https://youtube-clone-phi-dun.vercel.app',
    'http://localhost:5173'
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true
}));

app.use(express.json())
app.use(cookieParser());
app.use((req,res,next)=>{
    console.log(req.method,req.url)
    next()
})

// handle the all middle ware routes here
app.use('/user',userRouter)
app.use('/video',videoRouter)
app.use(commentRouter)

// create a server
let PORT=5000
app.listen(PORT,()=>{
    console.log(`Server Running on http://localhost:${PORT}`)
})
