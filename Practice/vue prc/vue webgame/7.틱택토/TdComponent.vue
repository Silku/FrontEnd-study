<template>
    <td v-on:click="onClickTd">{{cellData}}</td>
</template>

<script>

export default {
    props:{
        cellData : String,
        rowIndex : Number,
        cellIndex : Number,
    },
    methods:{
        onClickTd(){
            console.log(this.$root.$data)
            console.log(this.$parent.$data)
            this.$root.$data.turn = this.$root.$data.turn === 'o' ? 'x' : 'o';
        }
    }
}
</script>

<style>

</style>