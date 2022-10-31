
<template>
    <div>

    </div>
</template>


<script>

    export default {
        data(){
            return{

            }
        },
        computed:{

        },
        methods:{

        },
        beforeCreate(){
            console.log('beforeCreate')
        },
        created(){
            console.log('created')
        },
        mounted(){
            console.log('mounted')
            this.changeHand();
        },
        beforeDestroy(){

        },
        destroyed(){
            console.log('destroyed')
        },
        watch:{
            
        }
    };
</script>


<style scoped>

*{
    margin: 0 auto;
    text-align: center;
}

</style>