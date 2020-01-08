<template>
  <div class="backdrop" :class="backgroundClasses">
    <div v-show="!inGame" class="backdrop-dragarea">
      <span class="backdrop-dragline"></span>
    </div>
    <div ref="playareaRef" class="backdrop-playarea">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { useEventBusListener } from "@/composables/useEventBusListener.js";
import { onMounted, ref, computed, watch } from "@vue/composition-api";
import { useRouter } from "@/composables/route";
import { unwrap } from "@/composables/utils";

export default {
  name: "AppBackdrop",

  setup(props, context) {
    useEventBusListener("open-menu", () => {
      isOpen.value = !isOpen.value;
    });
    const isOpen = ref(false);
    const { route, inGame } = useRouter(context);
    const backgroundClasses = computed(() =>
      context.root.$route.name === "home"
        ? "bg-white"
        : ["bg-gray-900", "text-white"]
    );
    const isOpenn = computed(() => {
      if (route.value.name) return isOpen.value || inGame.value;
      return false;
    });
    let playareaRef = ref(null);

    onMounted(() => {
      playareaRef = unwrap(playareaRef);
      const combinedHeight =
        document.querySelector(".menu, .playfield").clientHeight + 54;
      const windowHeight = window.innerHeight;
      playareaRef.style.height = `${windowHeight - combinedHeight}px`;

      watch(() => {
        if (isOpenn) toggleMenu();
      });

      watch(inGame, () => {
        toggleMenu(true);
      });
    });

    function toggleMenu(recalculate = false) {
      let root = document.documentElement;
      let toolbarHeight = getComputedStyle(root).getPropertyValue(
        "--toolbar-height"
      );
      let menuHeight = document.querySelector(".menu, .playfield").clientHeight;

      if (!isOpen.value || recalculate) {
        root.style.setProperty("--backdrop-top", `${menuHeight + 54}px`);
      } else {
        root.style.setProperty("--backdrop-top", `${toolbarHeight}`);
      }
    }

    return { isOpen, isOpenn, backgroundClasses, playareaRef, inGame };
  }
};
</script>
