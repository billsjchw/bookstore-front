import Vue from "vue";
import VueRouter from "vue-router";
import router from "@/router";
import App from "@/App";
import "./index.css";

Vue.use(VueRouter);
Vue.config.productionTip = false;

new Vue({
    router: router,
    render: h => h(App)
}).$mount("#app");
