<template>
  <div class="page-color-picker">
    <router-link to="/" class="page-back router-link-active"><i class="mintui mintui-back"/></router-link>
    <div class="page-title">
      <h1>Color Picker</h1>
    </div>
    <div class="color-picker-container">
      <color-picker v-model="color1"></color-picker>
    </div>
    <div class="result">
      <div :style="{backgroundColor: color1 && color1.rgb().string()}">
        {{color1 && color1.rgb().string()}}
      </div>
    </div>
    <div class="color-input-container">
      <color-input class="color-input2" v-model="color2"></color-input>
      <color-input class="color-input3" v-model="color3" :withOpacity="false"></color-input>
    </div>
    <div class="gesture-container">
      <mt-button :type="openGesture?'danger':'primary'" size="large" @click="openGesture=!openGesture">{{openGesture?'close':'open'}} gesture</mt-button>
    </div>
    <gesture v-if="openGesture"></gesture>
  </div>
</template>

<style lang="scss" scoped rel="stylesheet/scss">
  .color-picker-container {
    width: 286px;
    margin: 20px auto;
  }
  .gesture-container{
    padding: 15px;
  }

  .result {
    background: url('../assets/result-bg.png');
    width: 200px;
    height: 40px;
    line-height: 40px;
    margin: auto;
    color: white;
    text-align: center;
  }

  .color-input-container {
    margin: 30px 0 0 0;
    padding: 0 30px;
    .color-input2 {
      width: 150px;
    }
    .color-input3 {
      width: 150px;
      float: right;
    }
  }
</style>

<script lang="es6">

  import Color from 'color';
  import ColorPicker from '../components/colorPicker';
  import ColorInput from '../components/colorInput';
  import Gesture from '../components/gesture';

  export default {
    data(){
      return {
        color1: null,
        color2: null,
        color3: null,
        openGesture: false
      }
    },
    components: {
      ColorPicker, ColorInput, Gesture
    }
  }
</script>
