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

function publicRooms(){
    // const sids = io.sockets.adapter.sids;
    // const rooms = io.sockets.adapter.rooms;

    // 위의 형식을 구조분해
    const {sockets : {adapter : {sids , rooms}}} = io;
    
    const publicRooms = [];
    rooms.forEach((_,key)=>{
        if(sids.get(key) === undefined){
            publicRooms.push(key)
        }
    }) 
    return publicRooms;
}

function countRoom(roomName){
    return io.sockets.adapter.rooms.get(roomName)?.size
}

io.on("connection", socket =>{
    // 닉네임 설정
    socket["nickname"] = "익명"

    // onAny : 모든 이벤트를 수신
    socket.onAny((e)=>{
        console.log(io.sockets.adapter)
        console.log(`socket Event : ${e}`)
    })

    socket.on("room", (roomName, done)=>{
        socket.join(roomName)
        done();
        //to: 지정된 방에 연결된 모두에게 메세지를 전송할 수 있음.
        socket.to(roomName).emit("welcome", socket.nickname, countRoom(roomName))

        io.sockets.emit("room_changes", publicRooms());
    })
    //"disconnecting" : 연결이 끊겼을때 발생하는 이벤트 
    socket.on("disconnecting", ()=>{
        socket.rooms.forEach((room)=>{
            socket.to(room).emit("bye", socket.nickname, countRoom(room)-1) //countRoom(roonName)-1을 해주는 이유 : disconnecting 이벤트가 방을 떠나기 직전에 실행되기때문.
        })
        // 아래처럼 넣을경우 작동하지 않는것 처럼 보이는데, disconnecting 이벤트가 room을 떠나기 바로 직전에 발생하기 떄문. => line 66처럼 disconnect에서 처리
        // io.sockets.emit("room_changes", publicRooms());
    })

    socket.on("disconnect", ()=>{
        io.sockets.emit("room_changes", publicRooms());
    })

    socket.on("new_message", (msg, room, done)=>{
        socket.to(room).emit("new_message", `${socket.nickname} : ${msg}`)
        done();
    })
    socket.on("nickname", (nickname)=>{
        socket["nickname"] = nickname;
    })
})



httpServer.listen(port, handleListen);
