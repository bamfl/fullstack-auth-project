<template>
  <q-dialog v-model="IsOpen">
    <q-card style="width: 700px; max-width: 80vw">
      <q-form @submit.prevent="registerUser">
        <q-card-section>
          <div class="text-h6">Registration</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input v-model="email" filled type="email" hint="Email" />
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            v-model="password"
            filled
            :type="isPwd ? 'password' : 'text'"
            hint="Password"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            v-model="passwordConfirmation"
            filled
            :type="isPwdConfirmation ? 'password' : 'text'"
            hint="Password Confirmation"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwdConfirmation ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwdConfirmation = !isPwdConfirmation"
              />
            </template>
          </q-input>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
        </q-card-actions>

        <q-card-actions class="bg-white text-teal">
          <q-btn
            type="submit"
            color="primary"
            label="register"
            :disabled="!isValidData"
            v-close-popup
          />
          <q-space />
          <q-btn
            color="secondary"
            label="To login"
            @click="$router.push('/login')"
            v-close-popup
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "stores/authStore";
import AuthService from "../../app/api/services/authService";

const authStore = useAuthStore();
const router = useRouter();

const IsOpen = ref(true);

const isPwd = ref(true);
const password = ref("");

const passwordConfirmation = ref("");
const isPwdConfirmation = ref(true);

const email = ref("");

const isValidData = computed(() => {
  if (password.value === passwordConfirmation.value) {
    return !!password.value && !!passwordConfirmation.value && !!email.value;
  }

  return false;
});

const registerUser = async () => {
  const { data } = await AuthService.registration({
    email: email.value,
    password: password.value,
  });

  authStore.setAuth(true);
  authStore.setUser(data.user);

  localStorage.setItem("accessToken", data.accessToken);

  router.push({ path: "/" });
};
</script>
