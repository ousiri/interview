// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import MintUI from 'mint-ui'
import './assets/common.scss'
import 'mint-ui/lib/style.css'
import VueRouter from 'vue-router'
import $ from 'jquery';

Vue.use(MintUI);
Vue.use(VueRouter);

Vue.directive('drag', {
  bind(el, binding){
    const $el = $(el), $body = $(document.body);
    binding.touchHandler = function (event) {
      if (event.type == 'touchstart') {
        binding.isTouching = true;
      } else if (event.type == 'touchmove') {
        event.preventDefault();
      } else if (event.type == 'touchend') {
        binding.isTouching = false;
      }
      // if (!binding.isTouching) return;
      const touch = event.touches.length ? event.touches[0] : null;
      if (!touch) return;
      binding.value && binding.value(event, {
        clientX: touch.clientX, clientY: touch.clientY, pageX: touch.pageX, pageY: touch.pageY,
        type: touch.type=='touchstart' ? 'start' : touch.type=='touchmove' ? 'move' : 'end'
      });
    };
    binding.mouseHandler = function (event) {
      if (event.type == 'mousedown') {
        binding.isTouching = true;
      } else if (event.type == 'mousemove') {
        event.preventDefault();
      } else if (event.type == 'mouseup') {
        binding.isTouching = false;
      }
      // if (!binding.isTouching) return;
      binding.value && binding.value(event, {
        clientX: event.clientX, clientY: event.clientY, pageX: event.pageX, pageY: event.pageY,
        type: event.type=='mousedown' ? 'start' : event.type=='mousemove' ? 'move' : 'end'
      });
    };
    $el.on('touchstart touchmove touchend', binding.touchHandler);
    $el.on('mousedown mousemove mouseup', binding.mouseHandler);
  },
  unbind(el, binding){
    const $body = $(document.body);
    $body.off('mousemove', binding.mouseHandler);
    $body.off('mouseup', binding.mouseHandler);
  }
});

const router = new VueRouter({
  routes: [
    {path: '/', component: require('./pages/index')},
    {path: '/colorPicker', component: require('./pages/colorPicker')},
    {path: '/gesture', component: require('./pages/gesture')}
  ]
});

const app = new Vue({
  router
}).$mount('#app');

setTimeout(function () {
  $('#app').css('minHeight', $(document).height());
});
