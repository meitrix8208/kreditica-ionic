<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Form</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Form</ion-title>
        </ion-toolbar>
      </ion-header>

      <ExploreContainer>
        <FormKit
          v-model="gender"
          label="Genero"
          type="select"
          :options="{
            m: 'masculino',
            f: 'femenino',
          }"
        />
        <FormKit
          v-model="car"
          label="tienes carro"
          type="select"
          :options="{
            Y: 'Si',
            N: 'No',
          }"
        />
        <FormKit
          v-model="house"
          label="tienes casa"
          type="select"
          :options="{
            Y: 'Si',
            N: 'No',
          }"
        />
        <FormKit
          v-model="children"
          label="
        tienes hijo(s) "
          type="number"
        />
        <FormKit
          v-model="annualIncome"
          label="ingreso anual (sin puntos)"
          type="number"
        />
        <FormKit
          v-model="incomeType"
          label="tipo de ingreso"
          type="select"
          :options="{
            S: 'salario',
            P: 'pensionado',
          }"
        />
        <FormKit
          v-model="educationLevel"
          label="nivel de educacion"
          type="select"
          :options="{
            HE: 'universidad',
            SE: 'bachillerato',
            IE: 'primaria',
            LE: 'incompleto',
          }"
        />
        <FormKit
          v-model="maritalStatus"
          label="tienes casa"
          type="select"
          :options="{
            M: 'Casado',
            S: 'Soltero',
            SE: 'Separado',
            CM: 'Matrimonio civil',
            W: 'viudo',
          }"
        />
        <FormKit
          v-model="houseType"
          label="tipo de vivienda"
          type="select"
          :options="{
            O: 'Propia',
            R: 'Arrendada',
          }"
        />
        <FormKit
          v-model="birthdayCount"
          label="Birthday_Count"
          type="number"
        />
        <FormKit
          v-model="employedDays"
          label="Fecha de inicio del empleo. Utilice el conteo regresivo desde el día actual (0). El valor positivo significa que el individuo está actualmente desempleado"
          type="number"
        />
        <FormKit
          v-model="mobilePhone"
          label="telephone"
          type="select"
          :options="{
            1: 'Si',
            0: 'No',
          }"
        />
        <FormKit
          v-model="email"
          label="Email"
          type="select"
          :options="{
            1: 'Si',
            0: 'No',
          }"
        />
        <FormKit
          v-model="familyMembers"
          label="numero de familiares"
          type="number"
        />
        <FormKit
          v-model="profession"
          label="profesion"
          type="select"
          :options="{
            Accountants: 'Accountants',
            CleaningStaff: 'Cleaning staff',
            CookingStaff: 'Cooking staff',
            CoreStaff: 'Core staff',
            Drivers: 'Drivers',
            HighSkillTechStaff: 'High skill tech staff',
            HRStaff: 'HR staff',
            ITStaff: 'IT staff',
            Laborers: 'Laborers',
            LowSkillLaborers: 'Low-skill Laborers',
            Managers: 'Managers',
            MedicineStaff: 'Medicine staff',
            PrivateServiceStaff: 'Private service staff',
            RealtyAgents: 'Realty agents',
            SalesStaff: 'Sales staff',
            Secretaries: 'Secretaries',
            SecurityStaff: 'Security staff',
            WaitersBarmenStaff: 'Waiters/barmen staff',
          }"
        />
        <IonButton @click="form">Enviar</IonButton>
      </ExploreContainer>
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
import { ref } from "vue";
const gender = ref("M");
const car = ref("Y");
const house = ref("Y");
const children = ref(0);
const annualIncome = ref(0);
const incomeType = ref("S");
const educationLevel = ref("HE");
const maritalStatus = ref("S");
const houseType = ref("O");
const birthdayCount = ref(0);
const employedDays = ref(0);
const mobilePhone = ref();
const email = ref();
const familyMembers = ref(0);
const profession = ref("Accountants");
const config = useRuntimeConfig();
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
const form = () => {
  // alert("Formulario enviado")
  const tokenJson = globalThis.localStorage.getItem("token");
  let token: Token = {
    access_token: "",
    roles: [],
  };
  if (!tokenJson) {
    alert("No hay token");
  } else {
    token = JSON.parse(tokenJson);
  }
  // console.log({
  //   GENDER: gender.value,
  //   Car_Owner: car.value,
  //   Propert_Owner: house.value,
  //   CHILDREN: children.value,
  //   Annual_income: annualIncome.value,
  //   Type_Income: incomeType.value,
  //   EDUCATION: educationLevel.value,
  //   Marital_status: maritalStatus.value,
  //   Housing_type: houseType.value,
  //   Birthday_count: birthdayCount.value,
  //   Employed_days: employedDays.value,
  //   Mobile_phone: parseInt(mobilePhone.value),
  //   EMAIL_ID: parseInt(email.value),
  //   Type_Occupation: profession.value,
  //   Family_Members: familyMembers.value,
  // });
  let interval: any;
  type Data = {
    predict: number;
  };
  const { data, error, status } = useFetch<Data>(
    `${config.public.API_URL}/predict`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.access_token}`,
      },
      body: JSON.stringify({
        GENDER: gender.value,
        Car_Owner: car.value,
        Propert_Owner: house.value,
        CHILDREN: children.value,
        Annual_income: annualIncome.value,
        Type_Income: incomeType.value,
        EDUCATION: educationLevel.value,
        Marital_status: maritalStatus.value,
        Housing_type: houseType.value,
        Birthday_count: birthdayCount.value,
        Employed_days: employedDays.value,
        Mobile_phone: mobilePhone.value,
        EMAIL_ID: email.value,
        Type_Occupation: profession.value,
        Family_Members: familyMembers.value,
      }),
    }
  );

  if (data) {
    console.log(status.value);
    interval = setInterval(() => {
      console.log(status.value);
      if (status.value === "success") {
        alert(
          `su credito fue: ${data.value?.predict} ${
            data.value?.predict === 1 ? "Aprobado" : "Rechazado"
          }`
        );
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
</script>
