<template>
    <div class="color-picker" :style="colorPickerStyle">
        <canvas ref="redGreenSidebar" id="red-green-sidebar" :width="width1" :height="height1"></canvas>
        <canvas ref="redGreenSidebar2" id="red-green-sidebar2" :width="width1" :height="height1"
                v-drag="redGreenDrag"></canvas>
        <div class="red-green-picker" ref="redGreenPicker"></div>
        <canvas ref="blueSidebar" id="blue-sidebar" :width="width2" :height="height2" v-drag="blueDrag"></canvas>
        <div class="blue-picker" ref="bluePicker"></div>
        <div class="alpha-wrapper" v-if="type!=1">
            <div class="alpha-sidebar" ref="alphaSidebar" v-drag="alphaDrag"></div>
        </div>
        <div class="alpha-picker" ref="alphaPicker" v-if="type!=1"></div>
    </div>
</template>

<style lang="scss" scoped>
    .color-picker{
        width: 286px;
        height: 272px;
        position: relative;
        overflow: hidden;
    }
    #red-green-sidebar, #red-green-sidebar2{
        width: 256px;
        height: 256px;
        position: absolute;
        top: 0;
        left: 0;
        user-select: none
    }
    .red-green-picker{
        position: absolute;
        width: 9px;
        height: 9px;
        border: 1px solid white;
        border-radius: 50%;
        margin-left: -5px;
        margin-top: -5px;
    }
    #blue-sidebar{
        width: 30px;
        height: 256px;
        position: absolute;
        top: 0;
        left: 256px;
        user-select: none
    }
    .blue-picker{
        width: 30px;
        height: 0;
        position: absolute;
        left: 256px;
        top: 0;
        &:before, &:after{
            content: ' ';
            position: absolute;
            top: -3px;
            left: 0;
            border-left: 5px solid white;
            border-top: 3px solid transparent;
            border-bottom: 3px solid transparent;
        }
        &:after{
            border-left: none;
            border-right: 5px solid white;
            left: auto;
            right: 0;
        }
    }
    .alpha-wrapper{
        padding: 3px 0;
        height: 10px;
        background: #bbb;
        position: absolute;
        top: 256px;
        left: 0;
        user-select: none
    }
    .alpha-sidebar{
        background: url(../assets/alpha-bg.png) repeat-y center center;
        width: 286px;
        height: 10px;
    }
    .alpha-picker{
        height: 16px;
        width: 0;
        position: absolute;
        top: 256px;
        left: 0;
        &:before, &:after{
            content: '';
            position: absolute;
            top: 0;
            left: -3px;
            border-top: 5px solid white;
            border-left: 3px solid transparent;
            border-right: 3px solid transparent;
        }
        &:after{
            bottom: 0;
            top: auto;
            border-top: none;
            border-bottom: 6px solid white;
        }
    }
</style>

<script lang="es6">

    import $ from 'jquery';
    import Color from 'color';
    import _ from 'lodash';

    export default {
        props: {
            value: { type: Color },
            type: {type: Number, default: 0}
        },
        data(){
            return {
                color: null,
                ratio: 1,
                width1: 256, height1: 256,
                width2: 30, height2: 256,
                width3: 286, height3: 30,
                redGreenCtx: null, redGreenCtx2: null, blueCtx: null,
                isBlueTouching: false,
                isAlphaTouching: false
            }
        },
        methods: {
            paintRedGreenBG(){
                const ctx1 = this.redGreenCtx;
                const ctx2 = this.redGreenCtx2;
                const imageData = ctx1.getImageData(0, 0, 1, 1);
                for(let i=0; i<256; i++){
                    for(let j=0; j<256; j++){
                        imageData.data[0] = i;
                        imageData.data[1] = 255-j;
                        imageData.data[2] = 255;
                        imageData.data[3] = 255;
                        ctx1.putImageData(imageData, i, j);
                        imageData.data[2] = 0;
                        ctx2.putImageData(imageData, i, j);
                    }
                }
            },
            paintRedGreen(color){ // left-top canvas
                this.$redGreenSidebar2.css('opacity', 1-color.blue()/255);
                this.adjustBluePicker(color);
                this.paintAlpha(color);
            },
            paintBlue(color){ // right-top canvas
                const ctx = this.blueCtx;
                const c = Color(color);
                const lineGrad = ctx.createLinearGradient(0, 0, 0, 256);
                lineGrad.addColorStop(0, c.blue(255).alpha(1).rgb().string());
                lineGrad.addColorStop(1, c.blue(0).alpha(1).rgb().string());
                ctx.fillStyle = lineGrad;
                ctx.fillRect(0, 0, 30, 256);
                this.adjustRedGreenPicker(color);
                this.paintAlpha(color);
            },
            paintAlpha(color){
                this.$alphaSidebar.css('backgroundColor', Color(color).alpha(1).rgb().string());
                this.adjustAlphaPicker(color);
            },
            adjustRedGreenPicker(color){
                this.$redGreenPicker.css({
                    left: color.red()+'px',
                    top: 255-color.green()+'px'
                })
            },
            adjustBluePicker(color){
                this.$bluePicker.css('top', 255-color.blue());
            },
            adjustAlphaPicker(color){
                this.$alphaPicker.css('left', color.alpha()*286);
            },
            redGreenDrag(event, touch){
                this.red = Math.min(255, Math.max(0, (touch.clientX - this.$redGreenSidebar2.offset().left)));
                this.green = 255-Math.min(255, Math.max(0, (touch.clientY - this.$redGreenSidebar2.offset().top)));
                this.paintBlue(this.color);
            },
            blueDrag(event, touch){
                this.blue = 255-(touch.clientY - this.$blueSidebar.offset().top);
                this.paintRedGreen(this.color);
            },
            alphaDrag(event, touch){
                this.alpha = (touch.clientX - this.$alphaSidebar.offset().left) / 286;
                this.paintAlpha(this.color);
            }
        },
        computed: {
            red: {
                set(v){
                    this.color = this.color.red(v);
                },
                get(){
                    return this.color.red();
                }
            },
            green: {
                set(v){
                    this.color = this.color.green(v);
                },
                get(){
                    return this.color.green();
                }
            },
            blue: {
                set(v){
                    this.color = this.color.blue(v);
                },
                get(){
                    return this.color.blue();
                }
            },
            alpha: {
                set(v){
                    v = parseFloat(v.toFixed(2));
                    this.color = this.color.alpha(v);
                },
                get(){
                    return this.color.alpha();
                }
            },
            colorPickerStyle(){
                console.log(123);
                return {
                    height: (this.type == 1 ? 256 : 272) + 'px'
                }
            }
        },
        created(){

            this.$watch('color', function(){
                this.$emit('input', this.color);
            }, {deep: true});

            this.color = this.value ||
                Color(`rgba(${parseInt(Math.random()*256)}, ${parseInt(Math.random()*256)}, ${parseInt(Math.random()*256)}, 1)`);
        },
        mounted(){
            this.$redGreenSidebar2 = $(this.$refs.redGreenSidebar2);
            this.$redGreenPicker = $(this.$refs.redGreenPicker);
            this.$blueSidebar = $(this.$refs.blueSidebar);
            this.$bluePicker = $(this.$refs.bluePicker);
            this.$alphaSidebar = $(this.$refs.alphaSidebar);
            this.$alphaPicker = $(this.$refs.alphaPicker);
            const $redGreenSidebar = this.$refs.redGreenSidebar;
            const $redGreenSidebar2 = this.$refs.redGreenSidebar2;
            const $blueSidebar = this.$refs.blueSidebar;

            this.redGreenCtx = $redGreenSidebar.getContext('2d');
            this.redGreenCtx2 = $redGreenSidebar2.getContext('2d');
            this.blueCtx = $blueSidebar.getContext('2d');

            this.paintRedGreenBG();
            this.paintRedGreen(this.color);
            this.paintBlue(this.color);
            this.paintAlpha(this.color);
        }
    }
</script>