import { createRouter, createWebHistory } from "vue-router";
const defaultTitle = "Home";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/home",
      component: () => import("../views/Home.vue"),
      alias: "/",
      meta: {
        title: "Home",
      },
    },
    {
      path: "/home/:id",
      props: true,
      component: () => import("../views/Task.vue"),
      meta: {
        title: "Task",
      },
    },
    {
      path: "/:404(.*)",
      component: () => import("../views/404.vue"),
      meta: {
        title: "404",
      },
    },
  ],
  linkActiveClass: "active",
  linkExactActiveClass: "active",
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title ? to.meta.title : defaultTitle;
  next();
});

export default router;
