<template>
    <div>
        <router-link to="/" class="page-back router-link-active"><i class="mintui mintui-back"/></router-link>
        <div class="page-title">
            <h1>Color Picker</h1>
        </div>
        <div class="content">
            <canvas ref="canvas1" id="canvas1" :width="width" :height="height"></canvas>
        </div>
    </div>
</template>

<style scoped>
    .content{

    }
    #canvas1{
        width: 300px;
        height: 300px;
        margin: 30px auto;
        display: block;
    }
</style>

<script lang="es6">

    export default {
        data(){
            return {
                width: 0,
                height: 0,
                ratio: 1
            }
        },
        created(){
            this.ratio = window.devicePixelRatio || 1;
            this.width = 300*this.ratio;
            this.height = 300*this.ratio;
        },
        mounted(){
            const canvas1 = this.$refs.canvas1;
            const ctx = canvas1.getContext('2d');

            /*ctx.fillStyle = 'rgb(200,0,0)';
            ctx.fillRect(10, 10, 55, 50);
            ctx.fillStyle = 'rgba(0, 0, 200, .5)';
            ctx.fillRect(30, 30, 55, 50);*/

            /*ctx.beginPath();
            ctx.moveTo(75,50);
            ctx.lineTo(100,75);
            ctx.lineTo(100,25);
            ctx.fill();*/

            /*ctx.beginPath();
            ctx.arc(150*this.ratio,150*this.ratio,100*this.ratio,0,Math.PI*2,true); // 绘制
            ctx.moveTo(220*this.ratio,150*this.ratio);
            ctx.arc(150*this.ratio,150*this.ratio,70*this.ratio,0,Math.PI,false);   // 口(顺时针)
            ctx.moveTo(130*this.ratio,110*this.ratio);
            ctx.arc(120*this.ratio,110*this.ratio,10*this.ratio,0,Math.PI*2,true);  // 左眼
            ctx.moveTo(190*this.ratio,110*this.ratio);
            ctx.arc(180*this.ratio,110*this.ratio,10*this.ratio,0,Math.PI*2,true);  // 右眼
            ctx.lineWidth = this.ratio;
            ctx.stroke();*/

            // 填充三角形
            ctx.beginPath();
            ctx.moveTo(25,25);
            ctx.lineTo(105,25);
            ctx.lineTo(25,105);
            ctx.fill();

            // 描边三角形
            ctx.beginPath();
            ctx.moveTo(125,125);
            ctx.lineTo(125,45);
            ctx.lineTo(45,125);
            ctx.closePath();
            ctx.stroke();

        }
    }
</script>