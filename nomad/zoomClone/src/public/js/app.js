const socket = io();

const welcome = document.querySelector('#welcome')
const form =document.querySelector("form")
const room =document.querySelector("#room")

room.hidden = true
let roomName;

const addMessage = (message) =>{
        const ul = room.querySelector('ul')
        const li = document.createElement("li")
        li.innerText = message
        ul.appendChild(li)
}

const handleMessageSubmit = (e) =>{
    e.preventDefault();
    const input = room.querySelector("input")
    const value =  input.value
    socket.emit("new_message", input.value, roomName, ()=>{
        addMessage(`you : ${value}`)
    });
    input.value = "";
}

const showRoom = () =>{
    welcome.hidden = true
    room.hidden = false
    const h3 = room.querySelector("h3");
    h3.innerText = `현재 참가중인 채팅 : ${roomName}`
    const form = room.querySelector("form")
    form.addEventListener("submit", handleMessageSubmit)
}

const handleRoomSubmit = (e) =>{
    e.preventDefault();
    const input = form.querySelector("input");
    socket.emit("room", input.value, showRoom);
    roomName = input.value;
    input.value ="" ;
}

form.addEventListener("submit", handleRoomSubmit)

socket.on("welcome", ()=>{
    addMessage("Someone Joined!");
})

socket.on("bye", ()=>{
    addMessage("Someone Left...");
})

socket.on("new_message", addMessage)
