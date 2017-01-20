<template>
    <div class="color-input-wrapper" ref="container">
        <input class="color-input" ref="colorInput" type="text" name="color" readonly
               :style="inputStyle" :value="color && color.rgb().string()" @click="open=!open"/>
        <div ref="dropdown" class="dropdown" :style="dropdownStyle" v-if="open">
            <color-picker v-model="color" :type="type"></color-picker>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .color-input-wrapper{
        display: inline-block;
        position: relative;
    }
    .color-input{
        display: block;
        width: 100%;
        border: none;
        color: white;
        text-align: center;
        padding: 0;
        //background-image: url(../assets/result-bg.png);
    }
    .dropdown{
        position: absolute;
        left: 0;
    }
</style>

<script lang="es6">

    import $ from 'jquery';
    import Vue from 'vue';
    import Color from 'color';
    import ColorPicker from '../components/colorPicker';

    export default {
        data(){
            return {
                color: null,
                open: false,
                onRight: false,
                onBottom: false
            }
        },
        props: {
            value: {type: Color},
            height: {type: Number, default: 24},
            type: {type: Number, default: 0}
        },
        computed: {
            inputStyle(){
                return {
                    backgroundColor: this.color && this.color.rgb().string(),
                    height: this.height + 'px',
                    lineHeight: this.height + 'px'
                }
            },
            dropdownStyle(){
                return {
                    top: this.onBottom ? 'auto' : this.height + 'px',
                    bottom: this.onBottom ? this.height + 'px' : 'auto',
                    left: this.onRight ? 'auto' : 0,
                    right: this.onRight ? 0 : 'auto',
                }
            }
        },
        components: {
            ColorPicker
        },
        methods: {
            bodyClick(e){
                if(!this.open) return;
                if(!$(e.target).closest(this.$refs.container).length){
                    this.open = false;
                }
            }
        },
        created(){
            this.$watch('color', function(v){
                this.$emit('input', v);
            });
            this.$watch('open', function(v){
                if(!v){
                    this.onRight = this.onBottom = false;
                    return;
                }
                Vue.nextTick(()=>{
                    const $dropdown = $(this.$refs.dropdown), $body = $(document.body);
                    if($dropdown.offset().left + $dropdown.width() >= $body.width()){
                        this.onRight = true;
                    }
                    if($dropdown.offset().top + $dropdown.height() >= $body.height()){
                        this.onBottom = true;
                    }
                })
            });
            this.color = this.value ||
                Color(`rgba(${parseInt(Math.random()*256)}, ${parseInt(Math.random()*256)}, ${parseInt(Math.random()*256)}, 1)`);

        },
        mounted(){
            const $body = $(document.body);
            $body.on('click', this.bodyClick);
        },
        beforeDestroy(){
            const $body = $(document.body);
            $body.off('click', this.bodyClick);
        }
    }
</script>