const socket = io();

const welcome = document.querySelector('#welcome')
const form =document.querySelector("form")

const handleRoomSubmit = (e) =>{
    e.preventDefault();
    const input = form.querySelector("input")
    socket.emit("room", {payload:input.value}, (done)=>{
        console.log(`서버에 펑션을 보낼수있다고 ?! ${done}`)    
    })
    input.value ="" 
}

form.addEventListener("submit", handleRoomSubmit)