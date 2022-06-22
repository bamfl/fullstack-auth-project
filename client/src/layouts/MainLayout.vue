<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          {{ authStore?.user?.email }}
        </q-toolbar-title>

        <q-btn color="negative" @click="logout">Logout</q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item>
          <router-link to="/">Home</router-link>
        </q-item>

        <q-item>
          <router-link to="/users">Users</router-link>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "stores/authStore";
import AuthService from "../app/api/services/authService.js";

const leftDrawerOpen = ref(true);

const authStore = useAuthStore();
const router = useRouter();

const refresh = async () => {
  const { data } = await AuthService.checkAuth();

  authStore.setAuth(true);
  authStore.setUser(data.user);

  localStorage.setItem("accessToken", data.accessToken);
  localStorage.setItem("user", JSON.stringify(data.user));
};

const logout = async () => {
  await AuthService.logout();

  authStore.setAuth(false);
  authStore.setUser(null);

  localStorage.removeItem("accessToken");
  localStorage.removeItem("user");

  router.push("/login");
};

onMounted(async () => {
  await refresh();
});
</script>
