<template>
  <IonPage>
    <div class="register">
      <h1 class="title">register</h1>
      <form
        class="form"
        @submit.prevent="login"
      >
        <label
          class="form-label"
          for="#email"
          >Email:</label
        >
        <input
          v-model="email"
          class="form-input"
          type="text"
          id="email"
          required
          placeholder="Email"
        />
        <label
          class="form-label"
          for="#password"
          >Password:</label
        >
        <input
          v-model="password"
          class="form-input"
          type="password"
          id="password"
          placeholder="Password"
        />
        <label
          class="form-label"
          for="#password-repeat"
          >Repite la contraeña:</label
        >
        <input
          v-model="passwordRepeat"
          class="form-input"
          type="password"
          id="password-repeat"
          placeholder="Password"
        />
        <input
          class="form-submit"
          type="submit"
          value="Sign Up"
        />
        <input
          @click="goLogin"
          class="form-submit"
          type="button"
          value="Login"
        />
      </form>
    </div>
  </IonPage>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useIonRouter } from "@ionic/vue";
import { useRuntimeConfig } from "#imports";

const config = useRuntimeConfig();
const email = ref("");
const password = ref("");
const passwordRepeat = ref("");
const router = useIonRouter();
const goLogin = () => router.push("/login");
const login = () => {
  console.log(email.value);
  console.log(password.value);
  console.log(passwordRepeat.value);
  if (password.value !== passwordRepeat.value) {
    alert("Las contraseñas no coinciden");
  }

  const { data, error } = useFetch(`${config.public.API_URL}/register`, {
    method: "POST",
    body: JSON.stringify({
      username: email.value,
      password: password.value,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (data) {
    alert("Usuario registrado");
    console.log(data.value);
    goLogin();
  } else {
    alert("Error");
    console.log(error.value);
  }
};
</script>

<style scoped>
.register {
  padding: 2rem;
}

.title {
  text-align: center;
}

.form {
  margin: 3rem auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 20%;
  min-width: 350px;
  max-width: 100%;
  background: rgba(19, 35, 47, 0.9);
  border-radius: 5px;
  padding: 40px;
  box-shadow: 0 4px 10px 4px rgba(0, 0, 0, 0.3);
  margin-top: 20px;
}

.form-label {
  margin-top: 2rem;
  color: white;
  margin-bottom: 0.5rem;
}

.form-label:first-of-type {
  margin-top: 0rem;
}

.form-input {
  padding: 10px 15px;
  background: none;
  background-image: none;
  border: 1px solid white;
  color: white;
}

.form-input:focus {
  outline: 0;
  border-color: #1ab188;
}

.form-submit {
  background: #1ab188;
  border: none;
  color: white;
  margin-top: 3rem;
  padding: 1rem 0;
  cursor: pointer;
  transition: background 0.2s;
}

.form-submit:hover {
  background: #0b9185;
}

.error {
  margin: 1rem 0 0;
  color: #ff4a96;
}
</style>
