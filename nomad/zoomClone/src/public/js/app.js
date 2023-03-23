const myLocation = window.location.host 
const socket = new WebSocket(`ws://${myLocation}`)


socket.addEventListener("open", ()=>{
    console.log("Connected to server ✅")
})

socket.addEventListener("message", (message) =>{
    console.log("서버응답 : ", message)
})


socket.addEventListener("close", ()=>{
    console.log("Disconnected to server ❌")
})

setInterval(()=>{
    socket.send("안녕하세요")
},1000)