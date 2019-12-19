<template>
  <div id="app" class="h-full">
    <app-background></app-background>
    <app-backdrop>
      <router-view />
    </app-backdrop>
    <!-- <button @click="capacity++">eyyyyyy</button>
    {{ capacity }} -->
  </div>
</template>

<script>
import AppBackground from "@/components/layout/AppBackground";
import AppBackdrop from "@/components/layout/AppBackdrop";
import { provideCards } from "@/store/modules/cards";

export default {
  components: {
    AppBackground,
    AppBackdrop
  },

  setup() {
    provideCards();
  }
};
</script>
