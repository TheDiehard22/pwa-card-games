<template>
  <div class="toolbar px-4">
    <toolbar-nav-icon></toolbar-nav-icon>

    <span class="toolbar-title">{{ routeTitle }}</span>
    <div class="spacer"></div>
    <!-- <img
      svg-inline
      :src="'@/assets/svg/icons/icon-dots-vertical.svg'"
      alt=""
      class="toolbar-dots ml-4"
    /> -->
  </div>
</template>

<script>
import { useRouter } from "@/composables/route";
import { computed } from "@vue/composition-api";
import ToolbarNavIcon from "@/components/ToolbarNavIcon";

export default {
  name: "AppToolbar",

  components: {
    ToolbarNavIcon
  },

  setup(props, context) {
    const { route } = useRouter(context);
    const routeTitle = computed(() => route.value.meta.title);

    return { routeTitle };
  }
};
</script>
