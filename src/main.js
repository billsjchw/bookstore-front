import Vue from "vue";
import VueRouter from "vue-router";
import router from "@/router";
import App from "@/App";
import {BootstrapVue} from "bootstrap-vue";
import {library} from "@fortawesome/fontawesome-svg-core";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {far} from "@fortawesome/free-regular-svg-icons";
import {fab} from "@fortawesome/free-brands-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.min.css";
import "./index.css";

library.add(fas, far, fab);

Vue.use(BootstrapVue);
Vue.use(VueRouter);
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.config.productionTip = false;

new Vue({
    router: router,
    render: h => h(App)
}).$mount("#app");
