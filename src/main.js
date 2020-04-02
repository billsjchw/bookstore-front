import Vue from "vue";
import VueRouter from "vue-router";
import router from "@/router";
import App from "@/App";
import {BootstrapVue} from "bootstrap-vue";
import {BootstrapVueIcons} from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.min.css";
import "./index.css";

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(VueRouter);
Vue.config.productionTip = false;

new Vue({
    router: router,
    render: h => h(App)
}).$mount("#app");
