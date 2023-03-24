const myLocation = window.location.host 
const socket = new WebSocket(`ws://${myLocation}`)

const messageList = document.querySelector('ul');
const nickNameForm = document.querySelector('#nick');
const messageForm = document.querySelector('#message');

const makeMessage = (type, payload) =>{
    const msg = {type, payload}
    return JSON.stringify(msg)
}

const handleConnect = () =>{
    console.log("Connected to server ✅")
}

socket.addEventListener("open", handleConnect)

socket.addEventListener("message", (message) =>{
    // console.log("서버응답 : ", message.data)
    const li = document.createElement('li')
    li.innerText =message.data;
    messageList.append(li)
})


socket.addEventListener("close", ()=>{
    console.log("Disconnected to server ❌")
})



const handleSubmit = (e) =>{
    e.preventDefault();
    const input = messageForm.querySelector('input');
    // console.log(input.value)
    socket.send(makeMessage("new_message", input.value))
    input.value=""
}


const handleNickSubmit = (e) =>{
    e.preventDefault();
    const input = nickNameForm.querySelector("input");
    socket.send(makeMessage("nickname", input.value))
    input.value=""
}



messageForm.addEventListener("submit", handleSubmit);
nickNameForm.addEventListener("submit", handleNickSubmit);