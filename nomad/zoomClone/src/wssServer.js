const express = require('express')
const http = require('http')
const WebSocket = require('ws');

const app = express();
const hostname = 'localhost'
const port = 3000

app.set("view engine", "pug")
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"))

app.get("/home", (req,res) => res.render("wssHome"))
// app.get("/*", (req,res) => res.redirect("/"))
// app.get("/*", (req,res) => res.render("404"))


const handleListen = () => console.log(`wss Listening on http://${hostname}:${port}`)
// app.listen(port, handleListen)

const server = http.createServer(app);

// server는 원래 빼도됨. wss랑 http server랑 둘다 돌아가게 하기 위한 작업.
// const wss = new WebSocket.Server({server})

const onSocketClose = () =>{
    console.log("disconnected from the Browser")
}

// 서로다른 브라우저를 연결하기 위한 db역할


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


server.listen(port, handleListen);
