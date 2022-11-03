
<template>
    <div>
        <TableComponent v-bind:table-data="tableData"></TableComponent>
        <div>{{turn}} 님의 턴입니다.</div>
        <div v-if="winner">{{winner}} 님의 승리.</div>
    </div>
</template>


<script>
/**
 * 정리 : 
 * TicTacToe => TableComponent => TrComponent => TdComponent
 * 3*3 이중배열 형태 (row, index)
 * 
 */

import Vue from 'vue';
import TableComponent from './TableComponent.vue';

export default{
    components: { 
        TableComponent 
    },
    data(){
        return {
            tableData:[
                [' ',' ',' '],
                [' ',' ',' '],
                [' ',' ',' '],
            ],
            turn : 'o',
            winner:'',
        };
    },
    methods:{
        /**
        *   vue에서 객체나 배열의 내부 index를 바꿀때 
            console에서는 데이터가 변동하고 있는걸 확인할수 있지만,
            실제로 화면에 반영이 안됨. (자바스크립트 한계)
         */

        onChangeData(){
            //this.tableData[1],[0] ='x'; 이런식으론 작동하지 않음
            // Vue.set(this.tableData[1], 0, 'x')  //가능한 방법
            this.$set(this.tableData[1], 0, 'x') // Vue.set과 동일
        },
    }
}
</script>


<style > 
*{
    text-transform: uppercase;
}
table {
    border-collapse :collapse;
}
td{
    border: 1px solid black;
    width:40px;
    height: 40px;
    text-align: center ;
}

/* *{
    margin: 0 auto;
    text-align: center;
} */

</style>