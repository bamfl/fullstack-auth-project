import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuth: !!localStorage.getItem("accessToken") || false,
    user: JSON.parse(localStorage.getItem("user")) || null,
  }),
  actions: {
    setAuth(authState) {
      this.isAuth = authState;
    },
    setUser(user) {
      this.user = user;
    },
  },
});
