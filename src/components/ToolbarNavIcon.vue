<template>
  <div class="toolbar-icon" v-ripple>
    <transition name="icon-swap" class="relative">
      <component
        :key="currentIcon"
        :is="currentIcon"
        class="toolbar-hamburger"
        :class="[fillHeight ? 'w-full h-full' : '']"
        @click="onClick($event)"
      ></component>
    </transition>
  </div>
</template>

<script>
import { useCards } from "@/store/modules/cards";

import { reactive, computed } from "@vue/composition-api";
import { useRouter, router } from "@/composables/route";

import menuIcon from "@/assets/svg/icons/inline.icon-menu.svg";
import backIcon from "@/assets/svg/icons/inline.icon-cheveron-left.svg";
import closeIcon from "@/assets/svg/icons/inline.icon-close.svg";
import dotsIcon from "@/assets/svg/icons/inline.icon-dots-vertical.svg";

import EventBus from "@/event-bus.js";

export default {
  name: "ToolbarNavIcon",
  props: {
    icon: {
      type: String
    },
    fillHeight: {
      type: Boolean,
      default: false
    }
  },
  components: {
    menuIcon,
    backIcon,
    closeIcon,
    dotsIcon
  },

  setup(props, context) {
    const { inGame, router } = useRouter(context);
    const { resetDeck } = useCards();
    const currentIcon = computed(() => {
      // console.log(inGame.value);
      if (inGame.value && !props.icon) return "backIcon";
      else if (props.icon) return props.icon;
      // else if () check if menu is open with useMenu hook

      return "menuIcon";
    });

    function onClick(evt) {
      const { emit } = context;
      emit("click", evt);

      switch (currentIcon.value) {
        case "backIcon":
          router.push("/");
          resetDeck();
          break;
        case "menuIcon":
        case "closeIcon":
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
