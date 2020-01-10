<template>
  <transition name="modal">
    <div v-show="isOpen" class="modal-background">
      <div class="modal">
        <component :is="modalComponent">
          <template v-slot:icon>
            <toolbar-nav-icon
              icon="closeIcon"
              fill-height
              class="h-8 w-8"
              @click="close"
            ></toolbar-nav-icon>
          </template>
        </component>
      </div>
    </div>
  </transition>
</template>

<script>
import { useModal } from "@/composables/useModal";
import ToolbarNavIcon from "@/components/ToolbarNavIcon";

export default {
  name: "BaseModal",

  components: {
    ToolbarNavIcon
  },

  setup() {
    const { isOpen, component: modalComponent, close } = useModal();

    return {
      isOpen,
      modalComponent,
      close
    };
  }
};
</script>
