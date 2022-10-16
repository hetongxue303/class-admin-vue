import { createRouter, createWebHistory, RouteRecordRaw, useRoute } from "vue-router";
import routes from "./routes";
import NProgress from "../plugins/nProgress";
import { getToken } from "../utils/auth";

const router = createRouter({
  history: createWebHistory(),
  routes
});

let WITHE_LIST: string[] = ["/login"];

router.beforeEach((to, from, next) => {
  NProgress.start();

  if (getToken()) {
    if (WITHE_LIST.indexOf(to.path)) {
      next();
    } else {
      next("/");
    }
  } else {
    if (to.meta.requireAuth) {
      next("/login");
    } else {
      next();
    }
  }

  NProgress.done();
});

router.afterEach(() => {});

export default router;
