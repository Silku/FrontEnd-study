
<template>
    <div>
        <TableComponent v-bind:table-data="tableData"></TableComponent>
        <div>{{turn}} 님의 턴입니다.</div>
    </div>
</template>


<script>
/**
 * 정리 : 
 * TableComponent => TrComponent => TdComponent
 * 3*3 이중배열 형태 (row, index)
 * 
 */


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
        };
    },
    methods:{

    },
}
</script>


<style > 
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