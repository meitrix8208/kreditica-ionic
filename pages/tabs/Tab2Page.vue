<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Historial</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Historial</ion-title>
        </ion-toolbar>
      </ion-header>
      <main>
        <ExploreContainer>
          <h1>Historial</h1>
          <IonButton @click="test">Actualizar</IonButton>
          <section
            v-for="registro in registros"
            :key="registro.id.toString()"
          >
            <ion-grid>
              <ion-row>
                <ion-col>Numero#</ion-col>
                <ion-col>{{ registro.id }}</ion-col>
              </ion-row>
              <ion-row>
                <ion-col>Genero</ion-col>
                <ion-col>{{ registro.gender }}</ion-col>
              </ion-row>
              <ion-row>
                <ion-col>Carro</ion-col>
                <ion-col>{{ registro.car_owner }}</ion-col>
              </ion-row>
              <ion-row>
                <ion-col>Casa</ion-col>
                <ion-col>{{ registro.property_owner }}</ion-col>
              </ion-row>
              <ion-row>
                <ion-col>Ingreso anual</ion-col>
                <ion-col>{{ registro.annual_income }}</ion-col>
              </ion-row>
              <ion-row>
                <ion-col>Tipo de ingreso</ion-col>
                <ion-col>{{ registro.type_income }}</ion-col>
              </ion-row>
              <ion-row>
                <ion-col>Nivel de educación</ion-col>
                <ion-col>{{ registro.education }}</ion-col>
              </ion-row>
              <ion-row>
                <ion-col>Estado civil</ion-col>
                <ion-col>{{ registro.marital_status }}</ion-col>
              </ion-row>
              <ion-row>
                <ion-col>Tipo de vivienda</ion-col>
                <ion-col>{{ registro.housing_type }}</ion-col>
              </ion-row>
              <ion-row>
                <ion-col>Cumpleaños</ion-col>
                <ion-col>{{ registro.birthday_count }}</ion-col>
              </ion-row>
              <ion-row>
                <ion-col>Dias Empleados</ion-col>
                <ion-col>{{ registro.employed_days }}</ion-col>
              </ion-row>
              <ion-row>
                <ion-col>Teléfono</ion-col>
                <ion-col>{{ registro.mobile_phone }}</ion-col>
              </ion-row>
              <ion-row>
                <ion-col>Email</ion-col>
                <ion-col>{{ registro.email_id }}</ion-col>
              </ion-row>
              <ion-row>
                <ion-col>Numero de Familiares</ion-col>
                <ion-col>{{ registro.family_members }}</ion-col>
              </ion-row>
              <ion-row>
                <ion-col>profesion</ion-col>
                <ion-col>{{ registro.type_occupation }}</ion-col>
              </ion-row>
              <ion-row>
                <ion-col>Resultado</ion-col>
                <ion-col>{{
                  registro.label === "1" ? "Aprobado" : "Rechazado"
                }}</ion-col>
              </ion-row>
              <ion-row v-if="token?.roles[0] === 'admin'">
                <ion-col>
                  <ion-button color="primary">Descargar</ion-button>
                </ion-col>
              </ion-row>
            </ion-grid>
          </section>
        </ExploreContainer>
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
definePageMeta({
  middleware: () => {
    if (!globalThis.localStorage.getItem("token")) {
      return navigateTo("/login");
    }
  },
});
const config = useRuntimeConfig();
type Registros = {
  id: Number;
  gender: String;
  car_owner: String;
  property_owner: String;
  annual_income: Number;
  type_income: String;
  education: String;
  marital_status: String;
  housing_type: String;
  birthday_count: Number;
  employed_days: Number;
  mobile_phone: Number;
  email_id: String;
  family_members: Number;
  type_occupation: String;
  label: String;
};
let registros = ref<Registros[]>([]);
type Token = {
  access_token: string;
  roles: string[];
};
let interval: any;
type Data = {
  details: Registros[];
};
let token: Token;

const test = () => {
  const tokenJson = globalThis.localStorage.getItem("token");

  if (!tokenJson) {
    alert("No hay token");
  }

  if (tokenJson) {
    token = JSON.parse(tokenJson);
  }

  if (!token?.roles[0]) {
    registros.value = [];
    alert("No tienes permisos");
  }
  const { data, error, status } = useFetch<Data>(
    `${config.public.API_URL}/listDetails`,
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
        data.value?.details;
        if (data.value?.details) registros.value = data.value?.details;
        console.log(data.value);
        clearInterval(interval);
      } else if (status.value === "error") {
        alert("Error");
        clearInterval(interval);
      }
    }, 1000);
  } else {
    alert("Error");
    console.log(error.value);
  }
};
onMounted(() => {
  test();
});
</script>

<style scoped>
ion-col {
  background-color: #ff7863;
  border: solid 1px #fff;
  color: #fff;
  text-align: center;
}
</style>
