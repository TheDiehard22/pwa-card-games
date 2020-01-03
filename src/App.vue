<template>
  <div id="app" class="app h-full">
    <app-background></app-background>
    <app-backdrop>
      <router-view />
    </app-backdrop>
    <app-notifications></app-notifications>
    <!-- <button @click="capacity++">eyyyyyy</button>
    {{ capacity }} -->
  </div>
</template>

<script>
import AppBackground from "@/components/layout/AppBackground";
import AppBackdrop from "@/components/layout/AppBackdrop";
import AppNotifications from "@/components/layout/AppNotifications";
import { provideCards } from "@/store/modules/cards";

export default {
  components: {
    AppBackground,
    AppBackdrop,
    AppNotifications
  },

  setup() {
    provideCards();
  }
};
</script>
