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
    socket.on("join_room", (roomName, done) =>{
        socket.join(roomName)
        done();
        socket.to(roomName).emit("welcome")
    })

    socket.on("offer", (offer, roomName) =>{
        socket.to(roomName).emit("offer", offer)
    })
})


httpServer.listen(port, handleListen);
