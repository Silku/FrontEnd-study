const socket = io();

const myFace = document.querySelector('#myFace');

const muteBtn = document.querySelector("#mute")
const cameraBtn = document.querySelector("#cameraControl")
const cameraSelect = document.querySelector("#cameras")

const call = document.querySelector("#call");



call.hidden = true;

let myStream;
let muted = false;
let cameraOff = false;
let roomName;
let myPeerConnection;

async function getCameras(){
    try{
        const devices = await navigator.mediaDevices.enumerateDevices();
        // console.log(devices)
        const cameras = devices.filter(device => device.kind === "videoinput")
        console.log(cameras)
        cameras.forEach((camera)=>{
            const option = document.createElement("option")
            option.value = camera.deviceId;
            option.innerText = camera.label;
            cameraSelect.appendChild(option)
        })
    }catch(err){
        console.log(err)
    }
}

async function getMedia(constraints) {
    try {
        myStream = await navigator.mediaDevices.getUserMedia({
            audio:true,
            video:true,
        });
        console.log(myStream)
        myFace.srcObject = myStream;
        await getCameras();
        /* 스트림 사용 */
    } catch(err) {
        /* 오류 처리 */
    }   
}


// 음소거 및 카메라 조작버튼
function handleMuteClick(){
    muted = !muted
    myStream
    .getAudioTracks()
    .forEach((track)=>(track.enabled = !track.enabled));
    if(!muted){
        muteBtn.innerText ="음소거"
    }else{
        muteBtn.innerText ="음소거 해제"
    }
}
function handleCameraClick(){
    cameraOff = !cameraOff
    myStream
        .getVideoTracks()
        .forEach((track)=>(track.enabled = !track.enabled));
    if(!cameraOff){
        cameraBtn.innerText ="카메라 끄기"
    }else{
        cameraBtn.innerText ="카메라 켜기"
    }
}

muteBtn.addEventListener("click", handleMuteClick)
cameraBtn.addEventListener("click", handleCameraClick)


// room 입장 && call getUserMedia API
const welcome = document.querySelector("#welcome");
const welcomeForm = welcome.querySelector("form")

async function startMedia(){
    welcome.hidden = true;
    call.hidden = false;
    await getMedia();
    makeConnection();
}

function handleWelcomeSubmit(e){
    e.preventDefault();
    const input = welcomeForm.querySelector("input");
    socket.emit("join_room", input.value, startMedia);
    roomName = input.value;
    input.value=""
}

welcomeForm.addEventListener("submit", handleWelcomeSubmit)

//socket Code

// Peer A에서 실행되는 코드
socket.on("welcome", async()=>{
    // console.log("누군가가 방에 입장했습니다!")
    const offer = await myPeerConnection.createOffer();
    myPeerConnection.setLocalDescription(offer);
    // console.log(offer)

    // 어떤방이 이 offer를 emit할건지 socket서버로 보내주기
    socket.emit("offer", offer, roomName)
})

// Peer B에서 실행되는 코드
socket.on("offer", offer =>{
    console.log(offer)
})

//RTC Code
function makeConnection(){
    myPeerConnection = new RTCPeerConnection();
    // console.log(myStream.getTracks())
    myStream
        .getTracks()
        .forEach(track=> myPeerConnection.addTrack(track, myStream));

}

