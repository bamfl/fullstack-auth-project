<template>
  <q-page class="flex flex-center">
    <div>
      <h6 v-if="!authStore.user?.isActivated">
        Ваш аккаунт не активирован! <br />
        На ваш email отправлено письмо с активацией аккаунта!
      </h6>

      <h6>Home page</h6>
    </div>
  </q-page>
</template>

<script setup>
import { useAuthStore } from "stores/authStore";

const authStore = useAuthStore();
</script>
