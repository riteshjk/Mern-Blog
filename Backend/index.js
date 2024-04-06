import express from 'express';
import connectDB from './config/db.js';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import cors from "cors"
import cookieParser from 'cookie-parser';
import postRouter from "./routes/post.route.js";
import commentRoute from "./routes/comment.route.js";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin:"*"
}))

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/post", postRouter);
app.use("/api/comment", commentRoute);

app.listen(3000, async()=>{
    try{
        await connectDB()
        console.log("connected to database successfully");
        console.log("server is running on port 3000");
    }
    catch(err){
        console.log(err,"failed to connect to database");
    }
   
})

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    })
})