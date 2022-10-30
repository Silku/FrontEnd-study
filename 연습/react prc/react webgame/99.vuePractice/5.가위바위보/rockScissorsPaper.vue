
<template>
    <div>
        <div id="computer" v-bind:style="computedStyleObj"></div>
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
    const rspCoords = {
        가위:'-139px',
        바위:'-2px',
        보:'-285px'
    }

    const scores = {
        가위 : 1,
        바위 : 0,
        보 : -1,
    }

    const computerChoice= (imgCoord) => {
        return Object.entries(rspCoords).find(function(v){
            return v[1] === imgCoord;
        })[0];
    }
    let interval = null;
    export default {
        data(){
            return{
                imgCoord:rspCoords.바위,
                result :'',
                score:0,
            }
        },
        computed:{
            computedStyleObj(){
                return {
                    background:`url(https://en.pimg.jp/023/182/267/1/23182267.jpg)${this.imgCoord} 0`,
                }
            }
        },
        methods:{
            changeHand(){
                interval = setInterval(()=>{
                    if(this.imgCoord == rspCoords.바위){
                        this.imgCoord = rspCoords.가위;
                    }else if(this.imgCoord == rspCoords.가위){
                        this.imgCoord = rspCoords.보;
                    }else if(this.imgCoord == rspCoords.보){
                        this.imgCoord = rspCoords.바위;
                    }
                },100);
            },
            onClickButton(choice){
                console.log('클릭')
                clearInterval(interval);
                const myScore = scores[choice];
                const cpuScore = scores[computerChoice(this.imgCoord)];
                const diff = myScore - cpuScore;
                if(diff === 0){
                    this.result = '비겼습니다.';
                }else if ([-1, 2].includes(diff)){
                    this.result = '이겼습니다.';
                    this.score += 1;
                }else {
                    this.result = '졌습니다.'
                    this.score -= 1; 
                }
                setTimeout(()=>{
                    this.changeHand()
                },1000)
            }
        },
        beforeCreate(){
            console.log('beforeCreate')
        },
        created(){
            console.log('created')
        },
        beforeMount(){
            console.log('beforeMount')
        },
        mounted(){
            console.log('mounted')
            this.changeHand();
        },
        beforeUpdate(){
            console.log('beforeUpdate')
        },
        updated(){
            console.log('updated')
        },
        beforeDestroy(){
            console.log('beforeDestroy')
            clearInterval(interval);
        },
        destroyed(){
            console.log('destroyed')
        }
    };
</script>


<style scoped>

*{
    margin: 0 auto;
    text-align: center;
}
    #computer{
        width: 145px;
        height: 200px;
        background-position: 0 0 ;
    }
</style>