const routes = [
  // Authenticated
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
    meta: { requireAuth: true },
  },

  {
    path: "/users",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/UsersPage.vue") }],
    meta: { requireAuth: true },
  },

  // Not Authenticated
  {
    path: "/login",
    component: () => import("layouts/AuthLayout.vue"),
    children: [
      { path: "", component: () => import("pages/auth/LoginPage.vue") },
    ],
    meta: { requireAuth: false },
  },

  {
    path: "/registration",
    component: () => import("layouts/AuthLayout.vue"),
    children: [
      { path: "", component: () => import("pages/auth/RegistrationPage.vue") },
    ],
    meta: { requireAuth: false },
  },

  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
    meta: { requireAuth: false },
  },
];

export default routes;
