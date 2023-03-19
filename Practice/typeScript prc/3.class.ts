// 추상클래스 : 다른 클래스에 상속하는것만 가능
abstract class User{
    constructor(
        // 접근제어자 : 클래스 접근범위 제한
        // public : 기본값, 클래스 외부에서 속성과 메소드에 모두 접근 가능
        // protected : 하위클래스에 상속시킬때
        // private :  해당 클래스 내부에서만 접근 가능(하위클래스 상속 불가 )
        private firstName : string,
        private secondName : string,
        public nickname : string
    ){}
    
    abstract getNickname() : void

    getFullName(){
        return `${this.firstName}, ${this.secondName} `
    }
}

//상속
class Player3 extends User{ 
    getNickname(){
        console.log(this.nickname) 
        //protected로 바꾸면 User를 상속받았기 떄문에 사용가능.
        //그러나 private로 바꾸면 User 안에서만 접근가능하기떄문에 사용 불가능
    }
}

const silku5  = new Player3("asd", "asd", "Asd")
// silku5.firstname  //private라 접근불가
silku5.nickname  //public인 nickname은 접근 가능. 

silku5.getFullName() 



/*********************************/
// type과 interface의 차이: 오브젝트의 모양을 설명한다는 점에서 같은 기능을함.

/**type : 
 * 1. 특정 값이나 객체의 값에 대한 타입을 지정해줄 수 있다.
    2. Type alias(타입에 대한 별명)를 만들어줄 수 있다.
    3. 타입을 특정한 값을 가지도록 제한할 수 있다.
 */
type Team = "red" | "blue" | "green"
type Hp = 1 | 5 | 10

type Player4 = {
    nickname : string,
    team: Team,
    hp : Hp
}

const silku6 : Player4 ={
    nickname : "silku",
    team : "red",
    hp : 10
}


// interface 차이 1 : 
// interface Team2 = "red" | "blue" | "green"  
// 위와 같은 코드는 interface에서는 불가능. interface는 typescript에서 오로지 객체의 모양을 설명할때 사용할 수 있다.

interface Player5 {
    nickname : string,
    team: Team,
    hp : Hp
}

const silku7 : Player5 ={
    nickname : "silku",
    team : "red",
    hp : 10
}

/**interface 차이2 : 
 * interface에서 할 수 있는 대부분의 기능들은 type에서 가능하지만, 한 가지 중요한 차이점은 type은 새로운 속성을 추가하기 위해서 다시 같은 이름으로 선언할 수 없지만, 
    interface는 항상 선언적 확장이 가능하다는 것이다. [https://yceffort.kr/2021/03/typescript-interface-vs-type]
 */

    interface Window {
        title: string
    }
    
    interface Window {
        size : number
    }


/*********************************/
//abstract class랑 interface 차이
//interface : 인터페이스는 클래스, 객체, 함수 등의 타입을 정의하는 역할. 인터페이스는 클래스와 같이 구현(implement)되지 않으며, 단지 타입 체크에만 사용됨.
//추상클래스는 인터페이스와 비슷하지만, 구현 코드도 포함. 추상 클래스는 추상 메소드를 포함할 수 있으며, 이 메소드는 자식 클래스에서 반드시 구현해야 함. 

//인터페이스와 달리 추상 클래스는 클래스의 멤버에 대한 구현 세부 정보를 포함할 수 있습니다.
//[https://heecheolman.tistory.com/65]



