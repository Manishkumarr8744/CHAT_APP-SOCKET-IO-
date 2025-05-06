// const express =require("express");
import express from "express" //framework
import dotenv from 'dotenv'//for .env file to access
import {connectDB} from "./lib/db.js"
import authRoutes from "./routes/auth.Route.js"
import messageRoutes from "./routes/message.Route.js"
import cookieparser from "cookie-parser"
import cors from "cors"
import { app ,server} from "./lib/socket.js"
// const app =express();

import path from "path"



dotenv.config() //for .env file to access
const PORT= process.env.PORT || 5000;//for .env file to access
const __dirname=path.resolve();
app.use(express.json());//exract the json data from body
app.use(cookieparser());// to parse cookie
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
    
})); 


app.use("/api/auth",authRoutes);    
app.use("/api/messages",messageRoutes); 

if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")))

    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
    })
}


app.use((err, req, res, next) => {
    console.error("🔥 Global error handler caught:", err);
    res.status(500).json({ message: "Something went wrong", error: err.message });
  });
  

server.listen(PORT,()=>{
    console.log(`✅ Server is running on port ${PORT}`);
    connectDB();
})