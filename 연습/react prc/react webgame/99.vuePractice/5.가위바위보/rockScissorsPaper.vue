
<template>
    <div>
        <div id="computer" v-bind:style="{background:`url(https://en.pimg.jp/023/182/267/1/23182267.jpg)  0 0`}"></div>
        <!-- v-bind:class와 v-bind:style은 객체 스타일을 지원해준다. -->
        <!-- ex) v-bind:class="{state: true, on:false }" -->
        <div>
            <button v-on:click="onClickButton('가위')">가위</button>
            <button v-on:click="onClickButton('바위')">바위</button>
            <button v-on:click="onClickButton('보')">보</button>
        </div>
        <div>{{result}}</div>
        <div>현재 점수 : {{score}}점</div>
    </div>
</template>


<script>

    export default {
        data(){
            return{
                result :'',
                score:0,
            }
        },
        methods:{
            onClickButton(choice){

            }
        }
    };
</script>


<style scoped>

*{
    margin: 0 auto;
    text-align: center;
}
    #computer{
        width: 142px;
        height: 200px;
        background-position: 0 0 ;
    }
</style>