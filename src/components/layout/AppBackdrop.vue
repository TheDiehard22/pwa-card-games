<template>
  <div class="backdrop" :class="backgroundClass">
    <slot></slot>
  </div>
</template>

<script>
import { useEventBusListener } from "@/composables/useEventBusListener.js";
import { onMounted, ref, computed, watch } from "@vue/composition-api";
import { useRouter } from "@/composables/route";
import { unwrap } from "../../composables/utils";

export default {
  name: "AppBackdrop",

  setup(props, context) {
    useEventBusListener("open-menu", () => {
      isOpen.value = !isOpen.value;
    });
    const isOpen = ref(false);
    const { route, inGame } = useRouter(context);
    const backgroundClass = computed(() =>
      context.root.$route.name === "home" ? "bg-white" : "bg-background-dark"
    );
    const isOpenn = computed(() => {
      if (route.value.name) {
        return isOpen.value || inGame.value;
      }
      return false;
    });

    watch(() => {
      if (isOpenn) toggleMenu();
    });

    function toggleMenu() {
      let root = document.documentElement;
      let toolbarHeight = getComputedStyle(root).getPropertyValue(
        "--toolbar-height"
      );
      let menuHeight = document.querySelector(".menu, .playfield").clientHeight;

      if (!isOpen.value) {
        root.style.setProperty("--backdrop-top", `${menuHeight + 54}px`);
      } else {
        root.style.setProperty("--backdrop-top", `${toolbarHeight}`);
      }
      console.log("toggling");
      // isOpen.value = !isOpen.value;
    }

    return { isOpen, isOpenn, backgroundClass };
  }
};
</script>
