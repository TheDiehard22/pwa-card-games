import { reactive, provide, inject, toRefs } from "@vue/composition-api";

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
  notifications: []
});

export let state = reactive(initialState());

export const computeds = {};

export const actions = {
  createNotification(payload) {
    const notification = new Notification(payload);
    state.notifications.push(notification);

    // settimeout for expiration
  }
};

const key = Symbol("notificationStore");

export function provideNotifcations() {
  provide(key, {
    ...toRefs(state),
    ...computeds,
    ...actions
  });
}

export function useNotifications() {
  const store = inject(key);

  if (!store) {
    // hmhmhmhmhm
  }

  return store;
}
