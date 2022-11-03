//JS 스프레드 문법

const dog = {
    name: '멍멍이'
}
const cuteDog = {
    ...dog,
    age : 10
}

const whiteCuteDog = {
    ...cuteDog,
    color:'white'
}

console.log(dog)
console.log(cuteDog)
console.log(whiteCuteDog)
//dog객체를 복사해와서 cuteDog에 넣어지게끔 해줌
// 결과적으로 whiteCuteDog는 name, age , color 키값을 갖게 됨