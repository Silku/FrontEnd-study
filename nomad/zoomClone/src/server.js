const express = require('express')
const http = require('http')
const SocketIO = require("socket.io");

const app = express();
const hostname = 'localhost'
const port = 3000

app.set("view engine", "pug")
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"))

app.get("/", (req,res) => res.render("home"))
app.get("/*", (req,res) => res.redirect("/"))


const handleListen = () => console.log(`Listening on http://${hostname}:${port}`)


const httpServer = http.createServer(app);
const io = SocketIO(httpServer)

io.on("connection", socket =>{
    socket.onAny((e)=>{
        console.log(`socket Event : ${e}`)
    })
    socket.on("room", (roomName, done)=>{
        socket.join(roomName)
        done();
        //to: 지정된 방에 연결된 모두에게 메세지를 전송할 수 있음.
        socket.to(roomName).emit("welcome")
    })
    //"disconnecting" : 연결이 끊겼을때 발생하는 이벤트 
    socket.on("disconnecting", ()=>{
        socket.rooms.forEach((room)=>{
            socket.to(room).emit("bye")
        })
    })
    socket.on("new_message", (msg, room, done)=>{
        socket.to(room).emit("new_message", msg)
        done();
    })
})


// 서로다른 브라우저를 연결하기 위한 db역할
/*

    const sockets = [];

    wss.on("connection", (socket)=>{
        // console.log(socket)
        sockets.push(socket);
        socket["nickname"] = "익명"
        console.log("connected to Browser ✅")
        // socket.send("connected to Browser ✅")
        socket.on("close", onSocketClose)
        socket.on("message", (msg)=>{
            // console.log(message.toString('utf-8'))
            // socket.send(message.toString('utf-8'))
            // sockets.forEach(v => v.send(message.toString('utf-8')));
            const message = JSON.parse(msg)
            switch(message.type){
                case "new_message" :
                    sockets.forEach((v)=> v.send(`${socket.nickname} : ${message.payload}`))
                    break;
                case "nickname" : 
                    // console.log(message.payload)
                    socket["nickname"] = message.payload;
                    break;
            }
        })
    })

*/

httpServer.listen(port, handleListen);
