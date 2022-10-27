<template>
    <div>
        <div id="screen" v-bind:class="state" v-on:click="onClickScreen">{{message}}</div>
        <div>
            <div>평균시간 : {{}}</div>
            <button @click="onReset">리셋</button>
            <div>수정수정ㅋㅋ</div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                result:[],
                state: 'waiting',
                message:'클릭해서 시작하세요'
            }
        },
        methods:{
            onReset(){

            },
            onClickScreen(){
                if(this.state == 'waiting'){
                    this.state = 'ready';
                }else if(this.state =='ready'){
                    this.state = 'now';
                }else if(this.state =='now'){
                    this.state = 'waiting';
                }
            }
        }
    };
</script>


<style scoped>
/* style에 scoped를 붙이면 다른 컴포넌트에는 영향을 주지않고 해당 컴포넌트 내에서만 이 CSS가 적용 된다. */
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