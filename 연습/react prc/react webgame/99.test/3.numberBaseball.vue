<template>
    <div>
        <div>{{result}}</div>
        <form v-on:submit="onSubmitForm">
            <input ref="" v-model="value">
            <button>입력</button>
        </form>
        <div> 시도 : {{}} </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                value: '',
                result: '',
            }
        },
        methods: {
            onSubmitForm(e) {
                e.preventDefault();
            }
        }

    }
</script>

<style>

</style>