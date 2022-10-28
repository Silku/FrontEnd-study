<template>
    <div>
        <div id="screen" v-bind:class="state" v-on:click="onClickScreen">{{message}}</div>
        <template v-if="result.length">
            <div>평균시간 : {{average}} ms</div>
            <button @click="onReset">리셋</button>
        </template>
    </div>
</template>

<script>
    let startTime = 0;
    let endTime = 0;
    let timeout = null;
    export default {
        data(){
            return{
                result:[],
                state: 'waiting',
                message:'클릭해서 시작하세요'
            }
        },
        computed:{
            //computed : 일반 데이터를 가공해서 쓸때 사용. 성능상 이슈를 개선하기 위함.
            //data() 와 computed로 분리해서 쓰는 이유는, computed 부분은 캐싱이 되기 때문.  
            average(){
                return this.result.reduce((a,c) => a+c, 0) /this.result.length || '0';
            }
        },
        methods:{
            onReset(){
                this.result = [];
            },
            onClickScreen(){
                if(this.state == 'waiting'){
                    this.state = 'ready';
                    this.message = '초록색이 되면 클릭!';
                    timeout = setTimeout(()=>{
                    this.state = 'now';
                    this.message = '지금 클릭하세요!'
                    startTime= new Date();
                    },Math.floor(Math.random() * 1000) +2000) //2~3초
                }else if(this.state =='ready'){
                    clearTimeout(timeout);
                    this.state = 'now';
                    this.message = '너무 성급해요!'
                }else if(this.state =='now'){
                    endTime = new Date();
                    this.state = 'waiting';
                    this.message = '클릭해서 시작하기!';
                    this.result.push(endTime-startTime);
                }
            }
        }
    };
</script>


<style scoped>
/* style에 scoped를 붙이면 다른 컴포넌트에는 영향을 주지않고 해당 컴포넌트 내에서만 이 CSS가 적용 된다. */
*{
    margin: 0 auto;
    text-align: center;
}
    #screen{
        width: 300px;
        height: 200px;
        text-align: center;
        user-select: none;
    }
    #screen.waiting{
        background-color: aqua;
    }
    #screen.ready{
        background-color: red;
    }
    #screen.now{
        background-color: greenyellow;
    }
</style>