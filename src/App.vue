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
import { onMounted } from "@vue/composition-api";
import { disableBodyScroll } from "body-scroll-lock";

export default {
  components: {
    AppBackground,
    AppBackdrop,
    AppNotifications
  },

  setup() {
    provideCards();

    onMounted(() => {
      const appEl = document.querySelector("#app");

      disableBodyScroll(appEl);
    });
  }
};
</script>
