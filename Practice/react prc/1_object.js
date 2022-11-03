// 비구조화 할당 예제 , 리액트에서 주로 사용되는 문법(?)
const dog = {
    name : '루시',
    age : 10,
    weight : 3.5
}

console.log(dog.name)
console.log(dog.age)
console.log(dog.weight)

const student = {
    'class number' : 1,
    'first name' : 'kim',
    'last name' : 'apple'
}

function print({name, age, weight}){
    console.log(`우리집 강아지 이름은 ${name}이며 나이는 ${age}살이고 몸무게는 ${weight}kg 입니당.`)
}
print(dog)


const member = {'apple':'사과', 'banana':'바나나', 'orange':'오렌지'}
const {apple , banana, orange} = member;
console.log(apple)
console.log(banana)
console.log(orange)

const users = ['사과' , '버내너', '오륀지']
const [apul, bana, orag] = users
console.log(apul)
console.log(bana)
console.log(orag)