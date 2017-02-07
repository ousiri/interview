
<template>
  <div class="gesture-wrapper" ref="wrapper">
    <canvas ref="canvas" :width="width" :height="height"></canvas>
  </div>
</template>

<style scoped lang="scss" rel="stylesheet/scss">
  .gesture-wrapper{
    pointer-events: none;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
</style>

<style>
  .taint {
    display: block;
    position: absolute;
    background: rgba(0, 0, 0, .3);
    border-radius: 100%;
    transform: scale(0);
    width: 330px;
    height: 330px;
  }

  .taint.drop {
    animation: fitButtonRipple .65s linear
  }

  @keyframes fitButtonRipple {
    0% {
      opacity: 1;
      transform: scale(0)
    }

    to {
      opacity: 0;
      transform: scale(2.5)
    }
  }
</style>

<script>
  import $ from 'jquery';
  export default {
    data(){
      return {
        width: 0,
        height: 0,
        $body: null,
        isTouching: false
      }
    },
    methods: {
      touchHandler(event){
        if (event.type == 'touchstart') {
          this.isTouching = true;
        } else if (event.type == 'touchend') {
          this.isTouching = false;
          this.moveHandler(event, {type: 'end'});
          return;
        }
        const touch = event.touches.length ? event.touches[0] : null;
        if(!touch) return;
        this.moveHandler(event, {
          clientX: touch.clientX, clientY: touch.clientY,
          type: event.type == 'touchstart' ? 'start' : event.type == 'touchmove' ? 'move' : 'end'
        });
      },
      mouseHandler(event){
        if(event.type == 'mousedown'){
          this.isTouching = true;
        }else if(event.type == 'mouseup'){
          this.isTouching = false;
        }
        this.moveHandler(event, {
          clientX: event.clientX, clientY: event.clientY,
          type: event.type == 'mousedown' ? 'start' : event.type == 'mousemove' ? 'move' : 'end'
        });
      },
      moveHandler(event, data){
        if(data.type == 'start'){
          if(this.timer){
            clearTimeout(this.timer);
            this.timer = null;
            this.clear();
          }
          this.ctx.beginPath();
          this.ctx.moveTo(data.clientX, data.clientY);
        }else if(data.type == 'move'){
          if(!this.isTouching) return;
          this.ctx.lineTo(data.clientX, data.clientY);
          this.ctx.stroke();
        }else{
          this.timer = setTimeout(()=>{
            this.clear();
            this.timer = null;
          }, 1000);
        }
      },
      clear(){
        this.ctx.clearRect(0, 0, this.width, this.height);
      },
      ripple(x, y){
        const size = Math.max(this.width, this.height);
        const left = x - size/2;
        const top = y - size/2;
        this.$wrapper.find('.taint').remove();
        this.$wrapper.append(`<div class="taint drop" style="width:${size}px;height:${size}px;left:${left}px;top:${top}px"></div>`)
      },
      clickHandler(e){
        this.ripple(e.clientX, e.clientY);
      }
    },
    mounted(){
      this.width = this.$refs.wrapper.clientWidth;
      this.height = this.$refs.wrapper.clientHeight;
      this.$body = $(document.body);
      this.$wrapper = $(this.$refs.wrapper);
      this.ctx = this.$refs.canvas.getContext('2d');
      this.$body.on('touchstart touchmove touchend', this.touchHandler);
      this.$body.on('mousedown mousemove mouseup', this.mouseHandler);
      this.$body.on('click', this.clickHandler);
    },
    beforeDestroy(){
      this.$body.off('touchstart touchmove touchend', this.touchHandler);
      this.$body.off('mousedown mousemove mouseup', this.mouseHandler);
      this.$body.off('click', this.clickHandler);
    }
  }
</script>
