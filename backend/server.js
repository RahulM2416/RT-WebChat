import {createServer} from 'node:http';
import express from 'express';
import { Server } from "socket.io";

const app = express();

const server = createServer(app);

const io = new Server(server , {
    cors : {
        origin : "*",
    },
});

const ROOM = "group";

io.on('connection' , (socket)=>{
    console.log('user connected', socket.id);
    socket.on("joinRoom", async (userName)=>{
        console.log(`${userName} joining the group.`);
        await socket.join(ROOM);
        
        //io.to(ROOM).emit("roomNotice",userName);

        socket.to(ROOM).emit("roomNotice",userName);
    });
    socket.on('chatMessage',(msg)=>{
        //console.log(msg);
        socket.to(ROOM).emit('chatMessage',msg);
    });

    socket.on('typing',(userName)=>{
        socket.to(ROOM).emit('typing',userName);
    });

    socket.on('stopTyping',(userName)=>{
        socket.to(ROOM).emit('stopTyping',userName);
    });
});

app.get("/",(req,res)=>{
    res.send("<h1> Hello World..!</h1>");
});

server.listen(3000,()=> {
    console.log("Connected successfully at the port 3000");
});