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
    // console.log(socket)
    socket.on("room", (msg, done)=>{
        console.log(msg)
        setTimeout(()=>{
            done("이게 되네?")
        },2000)
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
