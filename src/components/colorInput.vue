<template>
  <div class="color-input-wrapper" ref="container">
    <input class="color-input" ref="colorInput" type="text" name="color" readonly
           :style="inputStyle" :value="color && color.rgb().string()" @click="open=!open"/>
    <div ref="dropdown" class="dropdown" :style="dropdownStyle" v-if="open && actualType=='dropdown'">
      <color-picker v-model="color" :withOpacity="withOpacity"></color-picker>
    </div>
    <transition name="fade">
      <div ref="popup" class="popup" v-if="open && actualType=='popup'" @click.self="open=false"></div>
    </transition>
    <transition name="slideFromBottom">
      <div class="popup-inner" v-if="open && actualType=='popup'">
        <div class="popup-result">
          <div :style="{backgroundColor: color&&color.rgb().string()}">{{color && color.rgb().string()}}</div>
        </div>
        <color-picker v-model="color" :withOpacity="withOpacity"></color-picker>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped rel="stylesheet/scss">
  .color-input-wrapper {
    display: inline-block;
    position: relative;
  }

  .color-input {
    display: block;
    width: 100%;
    border: none;
    color: white;
    text-align: center;
    padding: 0;
  }

  .dropdown {
    position: absolute;
    left: 0;
  }

  .popup {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .8);
    z-index: 100;
  }

  .popup-inner {
    position: fixed;
    left: 0;
    bottom: 0;
    padding: 10px 0;
    background: #eee;
    width: 100%;
    z-index: 101;
  }

  .popup-result {
    width: 150px;
    background: url(../assets/result-bg.png);
    margin: 0 auto 10px;
    text-align: center;
    color: white;
    > div {
      width: 100%;
      height: 20px;
    }
  }

  .fade-enter-active, .fade-leave-active{
    transition-duration: .2s;
  }
  .fade-leave-active{
    transition-delay: .3s;
  }

  .slideFromBottom-enter-active, .slideFromBottom-leave-active{
    transition-delay: .2s;
    transition-duration: .3s;
  }
  .slideFromBottom-leave-active{
    transition-delay: 0s;
  }

</style>
<style>
  .color-input-wrapper .color-picker {
    margin: auto;
  }

</style>

<script lang="es6">

  import $ from 'jquery';
  import Vue from 'vue';
  import Color from 'color';
  import ColorPicker from '../components/colorPicker';

  function isMobile() {
    return !!navigator.userAgent.match(/iphone|ipod|android/i)
  }

  export default {
    data(){
      return {
        color: null,
        open: false,
        onRight: false,
        onBottom: false,
        actualType: 'dropdown'
      }
    },
    props: {
      value: {type: Color},
      height: {type: Number, default: 24},
      withOpacity: {type: Boolean, default: true}, // true for all, false for no opacity
      type: {type: String, default: 'auto'} // dropdown or popup
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
        if (!this.open) return;
        if (!$(e.target).closest(this.$refs.container).length) {
          this.open = false;
        }
      },
      hidePopup(e){

      }
    },
    created(){
      this.$watch('color', function (v) {
        this.$emit('input', v);
      });
      this.$watch('open', function (v) {
        if (!v) {
          this.onRight = this.onBottom = false;
          return;
        }
        if(this.actualType != 'dropdown') return;
        Vue.nextTick(() => {
          const $dropdown = $(this.$refs.dropdown), $body = $(document.body);
          if ($dropdown.offset().left + $dropdown.width() >= $body.width()) {
            this.onRight = true;
          }
          if ($dropdown.offset().top + $dropdown.height() >= $body.height()) {
            this.onBottom = true;
          }
        })
      });
      this.color = this.value ||
        Color(`rgba(${parseInt(Math.random() * 256)}, ${parseInt(Math.random() * 256)}, ${parseInt(Math.random() * 256)}, 1)`);
      this.actualType = this.type === 'auto' ? isMobile() ? 'popup' : 'dropdown' : this.type;
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
