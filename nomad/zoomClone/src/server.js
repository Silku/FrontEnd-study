const { Socket } = require('dgram');
const express = require('express')
const http = require('http')
const WebSocket = require('ws');

const app = express();
const hostname = 'localhost'
const port = 3000

app.set("view engine", "pug")
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"))

app.get("/", (req,res) => res.render("home"))
app.get("/*", (req,res) => res.redirect("/"))
// app.get("/*", (req,res) => res.render("404"))


const handleListen = () => console.log(`Listening on http://${hostname}:${port}`)
// app.listen(port, handleListen)

const server = http.createServer(app);

// server는 원래 빼도됨. wss랑 http server랑 둘다 돌아가게 하기 위한 작업.
const wss = new WebSocket.Server({server})
 

wss.on("connection", (socket)=>{
    // console.log(socket)
    console.log("connected to Browser ✅")
    socket.on("close", ()=>{console.log("disconnected from the Browser")})
    socket.on("message", (message)=>{
        console.log(message.toString('utf-8'))
    })
    socket.send("hi")
})

server.listen(port, handleListen);