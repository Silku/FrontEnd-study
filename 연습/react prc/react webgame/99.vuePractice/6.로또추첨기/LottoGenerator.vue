
<template>
    <div>
        <div>당첨숫자</div>
        <div id="결과창"> 
            <LottoBall v-for="ball in winBalls" v-bind:key="ball" v-bind:number="ball"></LottoBall>
        </div>
        <div>보너스</div>
            <LottoBall v-if="bonus" :number="bonus"></LottoBall>
        <button v-if="redo" @click="onClickRedo">한번 더!</button>
    </div>
</template>


<script>
import LottoBall from './LottoBall.vue';
    /**
        비동기 코드
        대표적으로 timer, eventListner 등
        
     */
    function getWinNumbers(){
        console.log('getWinNubers');
        const candidate = Array(45).fill().map((v,i) => i +1); //fill로 무작위 배열을 채운다음, map()으로 정렬
        const shuffle = [];
        while(candidate.length > 0){
            shuffle.push(candidate.splice(Math.floor(Math.random()*candidate.length),1)[0]);  
        }
        const bonusNumber = shuffle[shuffle.length -1];
        const winNumbers = shuffle.slice(0,6).sort((p,c) => p-c);
        return [...winNumbers, bonusNumber];
    }

    const timeouts = [] 
    export default {
        // LottoBall이라는 자식컴포넌트를 불러오기 위해서 components를 써줘야함.
        components: {
            LottoBall
            // 이름을 다르게 할 경우 아래와 같이 사용도 가능
            // 'lotto-ball':LottoBall.vue
        },
        data(){
            return{
                winNumbers:getWinNumbers(),
                winBalls:[],
                bonus:null,
                redo:false
            }
        },
        computed:{

        },
        methods:{
            onClickRedo(){
                this.winNumbers = getWinNumbers();
                this.winBalls= [];
                this.bonus=null;
                this.redo = false;
                this.showBalls();
            },
            showBalls(){
                 //6자리 숫자 표시
                for(let i = 0; i < this.winNumbers.length - 1; i++){
                    timeouts[i] = setTimeout(()=>{
                        this.winBalls.push(this.winNumbers[i]);
                    }, (i+1)*1000);
                }
                // 보너스 숫자 표시
                    timeouts[6] = setTimeout(()=>{
                        this.bonus = this.winNumbers[6];
                        this.redo= true;
                    },7000)
                }
        },
        beforeCreate(){
            console.log('beforeCreate')
        },
        created(){
            console.log('created')
        },
        mounted(){
            console.log('mounted')
            // 화면이 뜨자마자 mounted 되므로 mounted에 공이 나타나는 타이머에 대한 코드작성
            this.showBalls();
        },
        beforeDestroy(){
            // 예를들어 화면이 중간에 사라졌는데 setTimeout이 계속 있다면 메모리 누수가 예상되므로 라이프사이클 마지막에 반드시 클리어해줘야됨
            timeouts.forEach((t) =>{
                clearTimeout(t);
            })
        },
        destroyed(){
            console.log('destroyed')
        },
        watch:{
            // watch : 어떠한 값이 바뀌었을떄 감시하는 기능, 비동기로 동작
            winBalls(value, oldValue){
                if(value.length ===0){
                    this.showBalls();
                }
            },
            // redo(value, oldValue){
            //     if(value === false ){
            //         this.showBalls();
            //     }
            // }
        }
    };
</script>


<style scoped>

/* *{
    margin: 0 auto;
    text-align: center;
} */

</style>