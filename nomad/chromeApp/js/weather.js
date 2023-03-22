import { API_KEY } from "./api_key.js"

//오픈웨더API  https://openweathermap.org/current
const city = document.querySelector('.weather tbody td:first-child')
const weather = document.querySelector('.weather tbody td:nth-child(2)')
const temp = document.querySelector('.weather tbody td:nth-child(3)')
const wind = document.querySelector('.weather tbody td:nth-child(4)')

// const API_KEY = API_KEY

const onGeoOk= (position) =>{
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

            city.innerText = data.name
            weather.innerText = data.weather[0].description
            temp.innerText = `${data.main.temp}도`
            wind.innerText = `${data.wind.deg}/${data.wind.speed}`
            // console.log(data.name)
            // console.log(data.weather[0].main)
        })
    }

const onGeoError= () =>{
    alert("위치정보를 찾을 수 없습니다.")
}

// 사용자의 현재 위치정보를 가져옴
navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError) //getCurrentPosition(successCallback, errorCallback, options)



