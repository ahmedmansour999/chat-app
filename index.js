const express = require('express') ;
const http = require("http");
const { join } = require('path');


const app = express() ; 
const server = http.createServer(app)

const { Server } = require('socket.io') ;


const io = new Server(server) ;
io.on("connection" , (socket)=>{
    console.log("user a connected");

    socket.on("message" , (data)=> 
    {
        io.emit("msg" , data)
    }
    )

    socket.on('typing' , ()=>{
        socket.broadcast.emit('show-typing')
    })
    socket.on('stop-typing' , ()=>{
        socket.broadcast.emit('stop-typing')
    })
    
})





app.get("/" , (req , res)=>{
    res.sendFile(join(__dirname,'index.html'))
})




server.listen(3000 , ()=>console.log("Server Connected"))