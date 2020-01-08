import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      title: "The BlazeGames"
    }
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/red-or-black",
    name: "game-redOrBlack",
    component: () => import("../views/RedOrBlack.vue"),
    meta: {
      title: "Red or Black"
    }
  },
  {
    path: "/pick-a-suit",
    name: "game-pickASuit",
    component: () => import("../views/RedOrBlack.vue"),
    meta: {
      title: "Pick a suit"
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
