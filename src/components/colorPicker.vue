<template>
    <div class="color-picker">
        <div class="content">
            <canvas ref="canvas1" id="canvas1" :width="width1" :height="height1"></canvas>
            <canvas ref="canvas2" id="canvas2" :width="width2" :height="height2"></canvas>
            <canvas ref="canvas3" id="canvas3" :width="width3" :height="height3"></canvas>
        </div>
        <div class="display">
            <p class="range-result">{{value}}</p>
            <div v-if="value" class="range-color" :style="{backgroundColor:value}"></div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .color-picker{
        width: 286px;
        //height: 286px;
    }
    #canvas1{
        width: 256px;
        height: 256px;
        float: left;
    }
    #canvas2{
        width: 30px;
        height: 256px;
        float: left;
    }
    #canvas3{
        width: 286px;
        height: 30px;
        clear: both;
    }
    .range-input{
        display: block;
        width: 300px;
        margin: auto;
    }
    .range-result{
        text-align: center;
        margin: 10px auto;
    }
    .range-color{
        width: 300px;
        height: 20px;
        margin: auto;
    }
</style>

<script lang="es6">

    import Color from 'color';

    const ratio = window.devicePixelRatio || 1;

    export default {
        props: {
            value: { type: Color }
        },
        data(){
            return {
                color: null,
                ratio: 1,
                width1: 256 * ratio, height1: 256 * ratio,
                width2: 30 * ratio, height2: 256 * ratio,
                width3: 286 * ratio, height3: 30 * ratio,
                ctx1: null, ctx2: null, ctx3: null
            }
        },
        methods: {
            readColor(pos){
                const canvas1 = this.$refs.canvas1;
                const ctx = canvas1.getContext('2d');
                const pixel = ctx.getImageData(pos, 55, 1, 1);
                return `rgb(${pixel.data[0]},${pixel.data[1]},${pixel.data[2]})`;
            },
            convertedColor(color){

            },
            paintRG(color){ // left-top canvas
                const ctx = this.ctx1;
                const c = Color(color);
                ctx.fillStyle = "red";
                ctx.fillRect(0, 0, 50, 50);
                const imageData = ctx.getImageData(0, 0, 1, 1);
                for(let i=0; i<256; i++){
                    for(let j=0; j<256; j++){
                        imageData.data[0] = i;
                        imageData.data[1] = j;
                        imageData.data[2] = c.blue();
                        imageData.data[3] = 255;
                        for(let k=0; k<ratio; k++) {
                            ctx.putImageData(imageData, i*ratio+k, j*ratio+k);
                        }
                    }
                }
            },
            paintB(color){ // right-top canvas
                const ctx = this.ctx2;
                const c = Color(color);
                for(let i=0; i<256; i++){
                    ctx.beginPath();
                    for(let j=0; j<ratio; j++) {
                        ctx.moveTo(0, i*ratio+j);
                        ctx.lineTo(this.width2, i*ratio+j);
                    }
                    ctx.strokeStyle = c.blue(i).alpha(1).rgb().string();
                    ctx.stroke();
                    ctx.closePath();
                }
            },
            paintAlpha(color){ // bottom canvas, todo: could just use background
                const lineGrad = this.ctx3.createLinearGradient(0, 0, this.width3, this.height3);
                const start = Color(color).alpha(0);
                const end = Color(color).alpha(1);
                lineGrad.addColorStop(0, start.rgb().string());
                lineGrad.addColorStop(1, end.rgb().string());
                this.ctx3.fillStyle = lineGrad;
                this.ctx3.fillRect(0, 0, this.width3, this.height3);
            }
        },
        created(){
            this.color = this.value || Color('#7743CE');
        },
        mounted(){
            const $canvas1 = this.$refs.canvas1;
            const $canvas2 = this.$refs.canvas2;
            const $canvas3 = this.$refs.canvas3;
            this.ctx1 = $canvas1.getContext('2d');
            this.ctx2 = $canvas2.getContext('2d');
            this.ctx3 = $canvas3.getContext('2d');
            this.paintRG(this.color);
            this.paintB(this.color);
            this.paintAlpha(this.color);

        }
    }
</script>