import EventBus from "@/event-bus.js";
import { onMounted, onUnmounted } from "@vue/composition-api";

export function useEventBusListener(eventName, handler) {
  onMounted(() => EventBus.$on(eventName, handler));
  onUnmounted(() => EventBus.$off(eventName, handler));
}
