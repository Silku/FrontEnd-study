<template>
    <div class="ball" :style="styleObj">{{number}}</div>
</template>

<script lang="ts">
    export default{
        name:'LottoBall',
        props:{
            number:Number,
        },
        // !!금지사항 : props로 받은 데이터를 아래에서 바꾸는 행위
        /**
            ex/
            methods:{
                changeNumber(){
                    this.number = 5;
                }
            }
         **/ 
        computed:{
            styleObj(){
                let background;
                    if(this.number <=10){
                        background='red'
                    }else if(this.number <=20){
                        background='orange'
                    }else if(this.number <=30){
                        background='yellow'
                    }else if(this.number <=40){
                        background='blue'
                    }else{
                        background='green'
                    }
                return{
                background,
                };
            }
        },
        }
</script>
<style>
    .ball{
        display: inline-block;
        border:1px solid black;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        line-height: 40px;
        font-size: 20px;
        text-align: center;
        margin-right: 20px;
        color:white;
    }
</style>