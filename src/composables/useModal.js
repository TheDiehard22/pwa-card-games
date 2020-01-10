import { reactive, toRefs } from "@vue/composition-api";
import EndScreen from "@/components/modal/EndScreen";
import Settings from "@/components/modal/Settings";

const initialState = () => ({
  isOpen: false,
  small: false,
  component: null
});

export let state = reactive(initialState());

export function useModal() {
  function open(component = Settings) {
    state.component = component;
    state.isOpen = true;
  }
  function close() {
    state.component = null;
    state.isOpen = false;
  }

  return {
    ...toRefs(state),
    open,
    close
  };
}
