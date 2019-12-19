<template>
  <div>
    <app-toolbar></app-toolbar>
    <app-menu></app-menu>
  </div>
</template>

<script>
import AppMenu from "@/components/layout/AppMenu";
import AppToolbar from "@/components/layout/AppToolbar";

export default {
  name: "AppBackground",
  components: {
    AppMenu,
    AppToolbar
  }
};
</script>

<style lang="scss" scoped></style>
