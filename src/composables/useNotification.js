import { reactive, toRefs } from "@vue/composition-api";
import messages from "@/data/messages.json";

let _id = 0;
class Notification {
  id = null;
  createdAt = null;
  duration = 1000;

  constructor({ type, scoreStreak, loseStreak }) {
    this.id = _id++;
    this.createdAt = new Date();
    this.type = type; // correct, wrong
    this.message = this.getRandomMessage(scoreStreak, loseStreak);
  }

  getRandomIntInclusive(max = 1) {
    // max should be array length -1
    const min = 0;
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getRandomMessage(scoreStreak, loseStreak) {
    const currentMessages = messages[this.type]; // choose whether to show messages from "wrong" or "correct"
    let allMessages;

    if (loseStreak === 0) {
      if (scoreStreak > 4) {
        allMessages = currentMessages.streak;
        return allMessages[this.getRandomIntInclusive(allMessages.length - 1)];
      }

      allMessages = currentMessages.default;
      return allMessages[this.getRandomIntInclusive(allMessages.length - 1)];
    } else {
      allMessages = currentMessages.default;
      return allMessages[this.getRandomIntInclusive(allMessages.length - 1)];
    }
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
      state.notifications.splice(idx, 1);
    }
  }

  return {
    ...toRefs(state),
    createNotification
  };
}
