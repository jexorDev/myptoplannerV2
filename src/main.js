import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import apexcharts from "./plugins/apexcharts";
import VueGtag from "vue-gtag";
import moment from "moment";

Vue.config.productionTip = false;

Vue.filter("formatDate", function(value) {
  if (!value) return "";

  const date = moment(value);

  if (!date.isValid()) return "";

  return date.format("MM/DD/YYYY");
});

Vue.use(
  VueGtag,
  {
    config: { id: "G-9NJRTDQEJ6" }
  },
  router
);

new Vue({
  router,
  store,
  vuetify,
  apexcharts,
  render: h => h(App)
}).$mount("#app");
