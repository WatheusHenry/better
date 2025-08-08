<template>
  <ion-app>
    <ion-router-outlet :swipe-back-enabled="false" />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
</script>
