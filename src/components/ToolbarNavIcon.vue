<template>
  <transition name="icon-swap" class="relative">
    <div class="toolbar-icon mr-6">
      <component
        :key="currentIcon"
        :is="currentIcon"
        class="toolbar-hamburger"
        @click="onClick()"
      ></component>
    </div>
  </transition>
</template>

<script>
import { useCards } from "@/store/modules/cards";

import { reactive, computed } from "@vue/composition-api";
import { useRouter, router } from "@/composables/route";

import menuIcon from "@/assets/svg/icons/inline.icon-menu.svg";
import backIcon from "@/assets/svg/icons/inline.icon-cheveron-left.svg";
import closeIcon from "@/assets/svg/icons/inline.icon-close.svg";

import EventBus from "@/event-bus.js";

export default {
  name: "ToolbarNavIcon",
  props: {},
  components: {
    menuIcon,
    backIcon,
    closeIcon
  },

  setup(props, context) {
    const { inGame, router } = useRouter(context);
    const { resetDeck } = useCards();
    const currentIcon = computed(() => {
      // console.log(inGame.value);
      if (inGame.value) return "backIcon";
      // else if () check if menu is open with useMenu hook

      return "menuIcon";
    });

    function onClick() {
      switch (currentIcon.value) {
        case "backIcon":
          router.push("/");
          resetDeck();
          break;
        case "menuIcon":
        case "closeIcon":
          openMenu();
        default:
          break;
      }
    }

    function openMenu() {
      EventBus.$emit("open-menu");
    }

    return { onClick, currentIcon };
  }
};
</script>

<style lang="scss" scoped>
.icon-swap {
  &-enter-active,
  &-leave-active {
    transition: all 0.6s ease-in-out;
  }

  &-leave-active {
    position: absolute;
  }

  &-enter,
  &-leave-to {
    transform: rotate(360deg) scale(0.3);
    opacity: 0.3;
  }
}
</style>
