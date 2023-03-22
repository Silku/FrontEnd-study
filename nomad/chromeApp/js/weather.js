import { API_KEY } from "./api_key.js"

//오픈웨더API  https://openweathermap.org/current
const city = document.querySelector('.weather tbody td:first-child')
const weather = document.querySelector('.weather tbody td:nth-child(2)')
const temp = document.querySelector('.weather tbody td:nth-child(3)')
const wind = document.querySelector('.weather tbody td:nth-child(4)')

const degToCompass = (num) => {
    const val = Math.floor((num / 22.5) + 0.5);
    const arr = ['북', '북북동', '동북동', '동동북', '동', '동동남', '남동', '남남동', '남', '남남서', '서남서', '서서남', '서', '서북서', '북서', '북북서'];
    return arr[(val % 16)];
}

const callbackOk= (position) =>{
    const lat = position.coords.latitude //위도
    const lon = position.coords.longitude //경도
    const lang = 'kr' //언어
    const units = 'metric' //섭씨
    console.log(`현재 위도 및 경도 : $${lat}, ${lon} `)
    const url =  `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=${lang}&units=${units}&appid=${API_KEY}`
    // console.log(url)
    fetch(url)
        .then(response => response.json())
        .then(data=>{
            const temperature = Math.round(data.main.temp)
            const windDirection = degToCompass(data.wind.deg)
            city.innerText = data.name
            weather.innerText = data.weather[0].description
            temp.innerText = `${temperature}도`
            wind.innerText = `${windDirection} ${data.wind.speed}m/s`
        })
}

const callbackError= () =>{
    alert("위치정보를 찾을 수 없습니다.")
}

// 사용자의 현재 위치정보를 가져옴
navigator.geolocation.getCurrentPosition(callbackOk, callbackError) //getCurrentPosition(successCallback, errorCallback, options)



