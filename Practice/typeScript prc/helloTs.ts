const hello : String = "Hello"

// 선택적으로 type을 주고 싶을때 ?를 붙이면 됨.
const player :{
    name : string,
    age? : number
} = {
    name : "tang",
    // age : 0
}

if(player.age && player.age < 10){ //age가 undefined거나 number일수있으므로 오류가나므로 이렇게 처리해야함.
    console.log("나이 : ", player.age)
}

/*********************************/
//Alias 라고 함
type Age = number;
type Player = {
    name : string,
    age? : Age
}

const silku : Player = {
    name : "silku"
}
const animal : Player = {
    name : "animal",
    age : 10
}
/*********************************/
//argument의 타입 지정하기, 함수의 return값에 타입 지정하기
function playerMaker (name : string)  : Player{
    return { 
        name : name 
    }
}

const silku2 = playerMaker("silku2")
silku2.age = 10


/*********************************/
//readonly 주기
type Player2 = {
    readonly name : string,
    age? : Age
}
const playerMaker2 = (name : string)  : Player2 =>({name})

const silku3 = playerMaker2("silku3")
// silku3.name ="tang" // readonly라서 변경이 안됨

/*********************************/
//Tuple : 어레이를 생성할수있게 하는데 최소한의 길이를 가져야하고, 특정위치에 특정타입이있어야함.

const player3 :  [string, number, boolean] = ["silku", 30, true]
const player4 : readonly [string, number, boolean] = ["silku", 30, true]


/*********************************/
// any : typeScript 보호장치 벗어나기 
const a : any[] = [1,2,3,4]
const b : any= false
a+b //이게 되버리네


/*********************************/
//unknown , void , never
// unknown 
let c : unknown; //변수타입을 미리알지 못할때 , api로부터 응답을 받는데 어떤타입일지 모를경우 등에 사용

// void : 아무것도 리턴하지않는 함수
function hellots2(){ //타입이 void임
    console.log("hello")
}

// never : 함수가 절대 return 하지않을때 사용
function hellots3():never{ 
    throw new Error("에러임!!")
}

function hellots4(name:string|number){ 
    if(typeof name==="string"){
        name
    }else if(typeof name ==="number"){
        name
    }else{
        name //얘는 never임, 실행되지 않아야됨.
    }
}