// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import MintUI from 'mint-ui'
import './assets/common.scss'
import 'mint-ui/lib/style.css'
import VueRouter from 'vue-router'

Vue.use(MintUI);
Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        {path: '/', component: require('./pages/index.vue')},
        {path: '/colorPicker', component: require('./pages/colorPicker.vue')}
    ]
});

const app = new Vue({
    router
}).$mount('#app');
