import Vue from 'vue';
import VueRouter from 'vue-router';
import router from '@/router';
import App from '@/App';
import {BootstrapVue, BootstrapVueIcons} from 'bootstrap-vue';
import HighchartsVue from 'highcharts-vue';
import '@/assets/css/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.min.css';

Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(HighchartsVue);
Vue.config.productionTip = false;

new Vue({
  router: router,
  render: h => h(App),
}).$mount('#app');
