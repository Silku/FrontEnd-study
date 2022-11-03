<template>
    <table>
        <TrComponent v-for="(rowData, index) in tableData" 
        v-bind:key="index"
        v-bind:row-data="rowData" 
        v-bind:row-index="index" 
        >
        </TrComponent>
    </table>
</template>

<script>
import TrComponent from './TrComponent'

    export default{
        props:{
            tableData : Array,
        },
        components:{
            TrComponent,
        }
    }
</script>
<style>

</style>