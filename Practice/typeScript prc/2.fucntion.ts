// call signature : 함수를 구현하기 전에 타입을 분리해 줄 수 있다.
type Add = (a:number, b:number) => number;

// 이렇게도 사용가능,
type Add2 = {
    (a:number, b:number) : number
}

const add:Add =(a, b) => a+b

/*********************************/
//Overloading  : 동일한 이름을 가진 함수에 매개 변수 타입 또는 리턴 타입이 다른 여러 함수를 만들 수 있다.
function add2(a: number, b: number): number;
function add2(a: string, b: string): string;
function add2(a: any, b: any, c?: number): any {
    if(c) return a+b+c
    return a + b;
}

type Config = {
    path : string,
    state : object
}

type Push = {
    (path : string) : void;
    (config : Config) : void;
}

const push:Push = (config ) =>{
    if(typeof config ==="string"){
        console.log(config)
    }else{
        console.log(config.path, config.state) 
    }
} 

/*********************************/
// Polymorphism(다형성) : 여러 타입을 받고 여러형태를 가질수 있음.
// concrete type : number, string , void ,unknown등.. 기존에 정해져있는 타입
// abstract type : any .. 어떤값이등 할당가능하고 정해져있지 않음.
// generic : <T>  .. type의 placeholder라고 생각하면 됨. 인자값의 타입을 유추해서 출력할때도 같은 타입으로 만들어줌.

//generic ex1)
type SuperPrint = {
    <T>(arr: T[]) : void //return 없을땐 void
}

const superPrint : SuperPrint = (arr) =>{
    arr.forEach(i => console.log(i))
}

superPrint([1,2,3,4]) //number
superPrint([true,false,true]) //boolean
superPrint(["a", "b", "c"]) //string
superPrint([1,2,"a","b"]) //string|number 
superPrint<string | number>([1,2,"a","b"]) //이런식으로 generic에 overwrite해서 쓸 수도 있다.
// superPrint<string | boolean>([1,2,"a","b"]) //에러

//generic ex2)
type SuperPrint2 = {
    // T는 배열이 올것이고 M으로 2번째 인자를 받을것이다
    <T, M>(arr: T[], b: M) : T
}
const superPrint2 : SuperPrint2 = (arr) => arr[0]
const num1 = superPrint2([1,2,3,4], "") 
const boolean1 = superPrint2([true,false,true], 1) 
const string1 = superPrint2(["a", "b", "c"], false) 
const numstr1= superPrint2([1,2,"a","b"], "hello") 

// any를 쓰는거랑 generic을 쓰는것의 차이 : 
// any로 쓰면 타입체크로부터 보호가 안됨 아래와 같은 코드도 오류가 없다고 되버림.  
// generic은 인자값과 반환값이 일치하도록 보장해줌.

type SuperPrint3 = {
    (arr: any[]): any
}

const superPrint3: SuperPrint3 = (arr) => arr[0]
let 아무거나 = superPrint3([1, "b", true]);
아무거나.toUpperCase();

// generic ex)3 확장하기

type Profile<E> ={
    name : string,
    extraInfo : E
}

type ExtraInfo = {
    favFood : string
}

type MyProfile = Profile<ExtraInfo>

const silku4 : MyProfile ={
    name : "silku",
    extraInfo : {
        favFood : "pizza"
    }
}
//이런식으로 타입의 재사용이 가능
const nico : Profile<null> = {
    name : "nico",
    extraInfo : null
}
