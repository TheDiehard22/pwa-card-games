import { reactive, toRefs } from "@vue/composition-api";

const initialState = () => ({});

export let state = reactive(initialState());

export function useNotifications() {
  return {
    ...toRefs(state)
  };
}
