<template>
    <div>
        <router-link to="/" class="page-back router-link-active"><i class="mintui mintui-back"/></router-link>
        <div class="page-title">
            <h1>Color Picker</h1>
        </div>
        <div class="color-picker-container">
            <color-picker v-model="curColor"></color-picker>
        </div>
    </div>
</template>

<style scoped>
    .color-picker-container{
        width: 286px;
        margin: 20px auto;
    }
</style>

<script lang="es6">

    import Color from 'color';
    import ColorPicker from '../components/colorPicker';

    export default {
        data(){
            return {
                curColor: null
            }
        },
        components: {
            ColorPicker
        },
        created(){
//            console.log(this.value);
        }
    }
</script>