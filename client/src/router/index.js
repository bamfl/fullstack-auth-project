import { route } from "quasar/wrappers";
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import routes from "./routes";
import { useAuthStore } from "stores/authStore";

export default route(() => {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === "history"
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    history: createHistory(
      process.env.MODE === "ssr" ? void 0 : process.env.VUE_ROUTER_BASE
    ),
  });

  const authStore = useAuthStore();

  Router.beforeEach((to, from, next) => {
    const isAuthenticated = authStore.isAuth;

    if (to.meta.requireAuth && !isAuthenticated) {
      next({ path: "/login" });
    } else {
      next();
    }
  });

  return Router;
});
