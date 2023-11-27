<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>info</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">info</ion-title>
        </ion-toolbar>
      </ion-header>
      <main>
        <h1>Info del usuario</h1>
        <ion-grid class="m-6">
          <ion-row>
            <ion-col>Nombre</ion-col>
            <ion-col>{{ username }}</ion-col>
          </ion-row>
          <ion-row>
            <ion-col>role</ion-col>
            <ion-col>{{ token?.roles[0] }}</ion-col>
          </ion-row>
          <ion-row>
            <ion-col>Logout</ion-col>
            <ion-col @click="logout">
              <ion-button>
                <ion-icon :icon="ioniconsLogOut"></ion-icon>
                Logout</ion-button
              >
            </ion-col>
          </ion-row>
        </ion-grid>
      </main>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/vue";
import { useRuntimeConfig } from "#imports";
const config = useRuntimeConfig();
const username = ref("username");
definePageMeta({
  middleware: () => {
    if (!globalThis.localStorage.getItem("token")) {
      return navigateTo("/login");
    }
  },
});
type Token = {
  access_token: string;
  roles: string[];
};
let token: Token;
onMounted(() => {
  const tokenJson = globalThis.localStorage.getItem("token");

  if (!tokenJson) {
    alert("No hay token");
  }

  if (tokenJson) {
    token = JSON.parse(tokenJson);
  }

  if (!token?.roles[0]) {
    alert("No tienes permisos");
  }
  let interval: any;
  type Data = {
    identity: {
      username: string;
    };
  };
  const { data, error, status } = useFetch<Data>(
    `${config.public.API_URL}/owner_user`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.access_token}`,
      },
    }
  );
  if (data) {
    console.log(status.value);
    interval = setInterval(() => {
      console.log(status.value);
      if (status.value === "success") {
        clearInterval(interval);
        console.log(data.value?.identity.username);
        if (data.value?.identity.username)
        username.value = data.value?.identity.username;
        
      } else if (status.value === "error") {
        alert("Error");
        clearInterval(interval);
      }
    }, 1000);
  } else {
    alert("Error");
    console.log(error.value);
  }
});

const logout = () => {
  globalThis.localStorage.removeItem("token");
  navigateTo("/login");
};
</script>
<style scoped>
ion-col {
  background-color: #ff7863;
  border: solid 1px #fff;
  color: #fff;
  text-align: center;
}
</style>
