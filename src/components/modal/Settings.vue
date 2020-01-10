<template>
  <div>
    <div class="modal-header flex items-center px-6 py-4">
      <span class="modal-heading">Settings</span>
      <div class="spacer"></div>
      <slot name="icon"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalSettings"
};
</script>
