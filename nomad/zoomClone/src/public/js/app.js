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
    const input = room.querySelector("#msg input")
    const value =  input.value
    socket.emit("new_message", input.value, roomName, ()=>{
        addMessage(`you : ${value}`)
    });
    input.value = "";
}

const handleNicknameSubmit = (e) =>{
    e.preventDefault();
    const input = room.querySelector("#name input")
    const value =  input.value
    socket.emit("nickname", value);
    input.value = "";
}

const showRoom = () =>{
    welcome.hidden = true
    room.hidden = false
    const h3 = room.querySelector("h3");
    h3.innerText = `현재 참가중인 채팅 : ${roomName}`
    const msgForm = room.querySelector("#msg")
    const nameForm = room.querySelector("#name")
    msgForm.addEventListener("submit", handleMessageSubmit)
    nameForm.addEventListener("submit", handleNicknameSubmit)
}

const handleRoomSubmit = (e) =>{
    e.preventDefault();
    const input = form.querySelector("input");
    socket.emit("room", input.value, showRoom);
    roomName = input.value;
    input.value ="" ;
}

form.addEventListener("submit", handleRoomSubmit)

socket.on("welcome", (user, newCount)=>{
    const h3 = room.querySelector("h3")
    h3.innerText = `Room ${roomName} (${newCount})`
    addMessage(`${user} is Joined!`);
})

socket.on("bye", (user, newCount)=>{
    const h3 = room.querySelector("h3")
    h3.innerText = `Room ${roomName} (${newCount})`
    addMessage(`${user} is Left...`);
})

socket.on("new_message", addMessage)

socket.on("room_changes", (rooms) => {
    const roomList = welcome.querySelector("ul");
    roomList.innerHTML =""
    if(rooms.length === 0){
        return;
    }
    rooms.forEach((room) =>{
        const li = document.createElement("li")
        li.innerText = room
        roomList.append(li)
    })
})
