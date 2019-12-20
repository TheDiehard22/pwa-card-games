import { reactive, toRefs } from "@vue/composition-api";

let _id = 0;
class Notification {
  id = null;
  createdAt = null;
  duration = 1000;

  constructor({ type, message }) {
    this.id = _id++;
    this.createdAt = new Date();
    this.type = type; // correct, wrong
    this.message = message;
  }
}

const initialState = () => ({
  list: new Map(),
  notifications: []
});

export let state = reactive(initialState());

export function useNotifications() {
  function createNotification(payload) {
    const notification = new Notification(payload);
    state.notifications.push(notification);
    state.list.set(notification.id, notification);

    // settimeout for expiration
    setTimeout(() => {
      removeNotification(notification);
    }, 2000);
  }

  function removeNotification({ id }) {
    const notification = state.list.get(id);
    // console.log(notification);
    if (notification) {
      const idx = state.notifications.findIndex(({ id: _id }) => {
        return _id === id;
      });
      console.log("?", idx);
      state.notifications.splice(idx, 1);
    }
    // state.notifications.delete(notification.id);
  }

  return {
    ...toRefs(state),
    createNotification
  };
}
