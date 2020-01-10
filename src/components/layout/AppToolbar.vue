<template>
  <div class="toolbar px-2">
    <toolbar-nav-icon class="mr-4"></toolbar-nav-icon>

    <span class="toolbar-title">{{ routeTitle }}</span>
    <div class="spacer"></div>

    <div class="relative">
      <toolbar-nav-icon
        @click="openDropdown()"
        :icon="'dotsIcon'"
      ></toolbar-nav-icon>
      <transition name="dropdown">
        <div v-show="dropdownOpen" class="dropdown">
          <ul>
            <li @click="dropdownItemClick('refresh')" class="dropdown-listitem">
              Refresh
            </li>
            <li @click="dropdownItemClick('share')" class="dropdown-listitem">
              Share
              <span
                class="bg-green-400 text-green-900 text-sm rounded inline-block px-2"
                >Android only</span
              >
            </li>
            <li @click="dropdownItemClick('modal')" class="dropdown-listitem">
              Settings
            </li>
          </ul>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { useRouter } from "@/composables/route";
import { computed, ref } from "@vue/composition-api";
import ToolbarNavIcon from "@/components/ToolbarNavIcon";
import { useModal } from "@/composables/useModal";
import { outsideClick } from "@/helpers/dom";

export default {
  name: "AppToolbar",

  components: {
    ToolbarNavIcon
  },

  setup(props, context) {
    const { route } = useRouter(context);
    const routeTitle = computed(() => route.value.meta.title);
    const modal = useModal();
    let dropdownOpen = ref(false);

    function openDropdown() {
      const dropdownEl = document.querySelector(".dropdown");
      dropdownOpen.value = true;

      setTimeout(() => {
        outsideClick(ref(dropdownEl), closeDropdown);
      }, 200);
    }

    function closeDropdown() {
      dropdownOpen.value = false;
    }

    function dropdownItemClick(action) {
      closeDropdown();

      switch (action) {
        case "refresh":
          window.location.reload();
          break;
        case "share":
          if (navigator.share) {
            navigator.share({
              title: "BlazeGames",
              text: "Check out this great game",
              url: window.location.origin
            });
          }
          break;
        case "modal":
          modal.open();
          break;
        default:
          break;
      }
    }

    return { routeTitle, dropdownOpen, openDropdown, dropdownItemClick };
  }
};
</script>
