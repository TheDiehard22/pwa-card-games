import Vue from "vue";
import "./composition-plugin";
// import FnApi from "@vue/composition-api";
// Vue.use(FnApi);
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
// import store from "./store";

import "@/assets/styles/main.scss";

Vue.config.productionTip = false;

new Vue({
  router,
  // store,
  render: h => h(App)
}).$mount("#app");
