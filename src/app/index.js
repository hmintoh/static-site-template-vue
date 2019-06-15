import Vue from "vue";
import VueRouter from "vue-router";
import App from "./app.vue";
import router from "./router";

Vue.use(VueRouter);

const Router = new VueRouter({
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  mode: "history",
  root: "/",
  routes: router.routes
});

const root = new Vue({
  router: Router,
  render: h => h(App),
  mounted() {
    document.dispatchEvent(new CustomEvent("app.rendered"));
  }
});

document.addEventListener("DOMContentLoaded", function() {
  root.$mount("#app");
});
