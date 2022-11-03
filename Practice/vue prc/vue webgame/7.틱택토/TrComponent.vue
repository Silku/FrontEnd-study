<template>
    <tr>
        <TdComponent v-for="(cellData, index) in rowData" 
        v-bind:key="index"
        v-bind:cell-data="cellData"
        v-bind:cell-index="index" 
        v-bind:row-index="rowIndex"
        >
        </TdComponent>
    </tr>
</template>

<script>
import TdComponent from './TdComponent'

export default {
    props:{
        rowData : Array,
        rowIndex : Number,
    },
    components:{
        TdComponent,
    },
    data(){
        return{
            parent : '내가 조선의 국모다'
        }
    }
}
</script>

<style>

</style>