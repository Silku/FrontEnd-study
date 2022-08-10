export class Point{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.fixedY = y;
        this.speed = 0.1;
        this.cur = 0; 
        this.max = Math.random() * 100 + 150;
    }
    update(){
        this.cur += this.speed;
        this.y = this.fixedY + (Math.sin(this.cur) * this.max)
    }
    //웨이브를 그린다기보단, 각각의 간격을 가진 좌표를 만들어 좌표값에 Y값을 아래위로 이동시키고 각각의 좌표를 하나의 선으로 연결하는걸 그린다고 생각한다.
}