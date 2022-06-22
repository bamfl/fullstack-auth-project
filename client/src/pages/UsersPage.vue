<template>
  <div>Users: {{ users }}</div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import AuthService from "../app/api/services/authService.js";

const users = ref(null);

const getUsers = async () => {
  const { data } = await AuthService.getUsers();

  users.value = data.map((user) => user.email);
};

onMounted(async () => {
  await getUsers();
});
</script>
