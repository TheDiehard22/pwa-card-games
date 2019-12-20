import Vue from "vue";
import "./composition-plugin";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import Ripple from "vue-ripple-directive";

import "@/assets/styles/main.scss";

Vue.directive("ripple", Ripple);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
