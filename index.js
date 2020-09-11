const express = require('express');
const app = express();
const socketio = require('socket.io')
const http = require('http');
const { allowedNodeEnvironmentFlags } = require('process');
const server = http.createServer(app);
const io = socketio(server);
const users = require('./users/users');
server.listen(5000,()=> console.log("server started on port 5000"))

app.get('/',(req,res)=>{
    res.send("server is up and running");
})

io.on('connection',(socket)=>{
    
    socket.on("join",({name,room})=>{
        users.add(socket.id,name,room);
        socket.join(room);
        console.log(`${socket.id} has connected`)
        socket.broadcast.to(room).emit("messenger",{name:"admin",mes:`${name} has joined!`})
        const listUsers = users.getAllUsersOfRoom(room);
        io.emit("list-users",listUsers)
    })

    socket.emit("messenger",{name:"admin",mes:"Welcome to the room"})
    
    socket.on("messenger",(data)=>{
        let user = users.getUser(socket.id);
        if(user)
            socket.broadcast.to(user.room).emit("messenger",{name:user.name,mes:data})
    })

    socket.on("disconnect",()=>{
        users.RemoveUser(socket.id);
        console.log(`${socket.id} has disconnected`)
    })
})
