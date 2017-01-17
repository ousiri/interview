<template>
    <div>
        <div class="content">
            <canvas ref="canvas1" id="canvas1" :width="width1" :height="height1"></canvas>
            <canvas ref="canvas2" id="canvas2" :width="width2" :height="height2"></canvas>
            <canvas ref="canvas3" id="canvas3" :width="width3" :height="height3"></canvas>
        </div>
        <div class="display">
            <input type="range" v-model="range" class="range-input" name="range" :max="barWidth-1"/>
            <p class="range-result">{{range}}-{{curColor}}</p>
            <div v-if="curColor" class="range-color" :style="{backgroundColor:curColor}"></div>
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

    export default {
        props: {
            value: { type: Color },
            width: { type: Number },
            height: { type: Number }
        },
        data(){
            return {
                ratio: 1,
                range: 0,
                curColor: null,
                barWidth: 300
            }
        },
        created(){
            this.ratio = window.devicePixelRatio || 1;
            this.width = 300*this.ratio;
            this.height = 300*this.ratio;
        },
        methods: {
            readColor(pos){
                const canvas1 = this.$refs.canvas1;
                const ctx = canvas1.getContext('2d');
                const pixel = ctx.getImageData(pos, 55, 1, 1);
                return `rgb(${pixel.data[0]},${pixel.data[1]},${pixel.data[2]})`;
            },
            convertedColor(color){

            }
        },
        example(){
            ctx.fillStyle = 'rgb(200,0,0)';
             ctx.fillRect(10, 10, 55, 50);
             ctx.fillStyle = 'rgba(0, 0, 200, .5)';
             ctx.fillRect(30, 30, 55, 50);

            ctx.beginPath();
             ctx.moveTo(75,50);
             ctx.lineTo(100,75);
             ctx.lineTo(100,25);
             ctx.fill();

            ctx.beginPath();
             ctx.arc(150*this.ratio,150*this.ratio,100*this.ratio,0,Math.PI*2,true); // 绘制
             ctx.moveTo(220*this.ratio,150*this.ratio);
             ctx.arc(150*this.ratio,150*this.ratio,70*this.ratio,0,Math.PI,false);   // 口(顺时针)
             ctx.moveTo(130*this.ratio,110*this.ratio);
             ctx.arc(120*this.ratio,110*this.ratio,10*this.ratio,0,Math.PI*2,true);  // 左眼
             ctx.moveTo(190*this.ratio,110*this.ratio);
             ctx.arc(180*this.ratio,110*this.ratio,10*this.ratio,0,Math.PI*2,true);  // 右眼
             ctx.lineWidth = this.ratio;
             ctx.stroke();


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


            // Path2D
            /*var rectangle = new Path2D();
             rectangle.rect(10, 10, 50, 50);

             var circle = new Path2D();
             circle.moveTo(125, 35);
             circle.arc(100, 35, 25, 0, 2 * Math.PI);

             ctx.stroke(rectangle);
             ctx.fill(circle);*/

            /*for (var i=0;i<6;i++){
             for (var j=0;j<6;j++){
             ctx.fillStyle = 'rgb(' + Math.floor(255-42.5*i) + ',' +
             Math.floor(255-42.5*j) + ',0)';
             ctx.fillRect(j*25,i*25,25,25);
             }
             }*/

            /*function draw() {
             for (var i=0;i<6;i++){
             for (var j=0;j<6;j++){
             ctx.strokeStyle = 'rgb(0,' + Math.floor(255-42.5*i) + ',' +
             Math.floor(255-42.5*j) + ')';
             ctx.beginPath();
             ctx.arc(12.5+j*25,12.5+i*25,10,0,Math.PI*2,true);
             ctx.stroke();
             }
             }
             }*/

            /*function draw() {
             // 画背景
             ctx.fillStyle = '#FD0';
             ctx.fillRect(0,0,75,75);
             ctx.fillStyle = '#6C0';
             ctx.fillRect(75,0,75,75);
             ctx.fillStyle = '#09F';
             ctx.fillRect(0,75,75,75);
             ctx.fillStyle = '#F30';
             ctx.fillRect(75,75,75,75);
             ctx.fillStyle = '#FFF';

             // 设置透明度值
             ctx.globalAlpha = 0.2;

             // 画半透明圆
             for (var i=0;i<7;i++){
             ctx.beginPath();
             ctx.arc(75,75,10+10*i,0,Math.PI*2,true);
             ctx.fill();
             }
             }

             draw();*/
        },
        mounted(){
            const canvas1 = this.$refs.canvas1;
            const ctx = canvas1.getContext('2d');

//            ctx.arc(100, 100, 50, 0, Math.PI*2, true);
            ctx.moveTo(0, 50);
            ctx.lineTo(300, 50);
            ctx.lineWidth = 20;
//            ctx.stroke();

            const lingrad = ctx.createLinearGradient(0,0,300,0);
            lingrad.addColorStop(0, '#ffff00');
            lingrad.addColorStop(.333, '#ff00ff');
            lingrad.addColorStop(.666, '#00ffff');
            lingrad.addColorStop(1, '#ffff00');
            ctx.fillStyle = lingrad;
            ctx.strokeStyle = lingrad;


//            ctx.strokeRect(50,50,50,50);
            ctx.stroke();

            this.curColor = this.readColor(this.range);

            this.$watch('range', function(){
                this.curColor = this.readColor(this.range);
            });

        }
    }
</script>