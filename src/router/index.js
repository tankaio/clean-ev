import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";
// import Login from "../views/Login.vue";

//路由懒加载
const Home = () => import("@/views/Home.vue");
const Login = () => import("@/views/Login.vue");
const Notice = () => import("@/views/Notice.vue");
const NoticeDetails = () => import("@/views/NoticeDetails.vue");
const ShopVisit = () => import("@/views/ShopVisit.vue");
const ShopActivity = () => import("@/views/ShopActivity.vue");
const ShopSign = () => import("@/views/ShopSign.vue");
const Order = () => import("@/views/Order.vue");
const GoodsSelect = () => import("@/views/GoodsSelect.vue");
const Cart = () => import("@/views/Cart.vue");
const Mine = () => import("@/views/Mine.vue");

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Home
  },
  {
    path: "/home",
    name: "home",
    component: Home
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/notice",
    name: "notice",
    component: Notice
  },
  {
    path: "/noticedetails/:id",
    name: "noticedetails",
    component: NoticeDetails
  },
  {
    path: "/shopvisit",
    name: "shopvisit",
    component: ShopVisit
  },
  {
    path: "/shopactivity/:id",
    name: "shopactivity",
    component: ShopActivity
  },
  {
    path: "/shopsign/:id",
    name: "shopsign",
    component: ShopSign
  },
  {
    path: "/order",
    name: "order",
    component: Order
  },
  {
    path: "/goodsselect/:id",
    name: "goodsselect",
    component: GoodsSelect
  },
  {
    path: "/cart",
    name: "cart",
    component: Cart
  },
  {
    path: "/mine",
    name: "mine",
    component: Mine
  }
];

const router = new VueRouter({
  routes
});

export default router;
