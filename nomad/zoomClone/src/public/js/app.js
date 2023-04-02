const socket = io();

const myFace = document.querySelector('#myFace');

const muteBtn = document.querySelector("#mute")
const cameraBtn = document.querySelector("#cameraControl")
const cameraSelect = document.querySelector("#cameras")

let myStream;
let muted = false;
let cameraOff = false;

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

getMedia();



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




