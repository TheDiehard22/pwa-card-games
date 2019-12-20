<template>
  <div class="notification-container">
    <transition-group tag="div" name="notifications">
      <template v-for="notification in notifications">
        <div class="flex justify-end" :key="notification.id">
          <div
            class="notification-bubble"
            :class="[`notification-bubble--${notification.type}`]"
          >
            {{ notification.message }}
          </div>
        </div>
      </template>
    </transition-group>
  </div>
</template>

<script>
import { useNotifications } from "@/composables/useNotification.js";

export default {
  name: "AppNotification",

  setup() {
    const { notifications } = useNotifications();

    return { notifications };
  }
};
</script>
