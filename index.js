const express = require('express');
const app = express();
const socketio = require('socket.io')
const http = require('http');
const server = http.createServer(app);
const io = socketio(server);
server.listen(5000,()=> console.log("server started on port 5000"))

app.get('/',(req,res)=>{
    res.send("server is up and running");
})

io.on('connection',(socket)=>{
    console.log(`${socket.id} has connected`)
    socket.on("disconnect",()=>{
        console.log(`${socket.id} has disconnected`)
    })
})
