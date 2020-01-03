import {
  reactive,
  computed,
  provide,
  toRefs,
  inject,
  readonly
} from "@vue/composition-api";
import Vue from "vue";
import { useNotifications } from "@/composables/useNotification.js";

const ranks = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K"
];
const suits = { "♥": "red", "♦": "red", "♠": "black", "♣": "black" };
const options = [
  { question: "Red or Black", left: "Red", right: "Black" },
  { question: "Higher or Lower", left: "Higher", right: "Lower" },
  { question: "In or Out", left: "In", right: "Out" },
  {
    question: "Pick a Suit",
    topleft: "♥",
    topright: "♠",
    bottomleft: "♣",
    bottomright: "♦"
  }
];
const initialState = () => ({
  cards: [],
  playedCards: [],
  scoreStreak: 0, // given per correct card
  winStreak: 0, // given per correct set
  cardIdx: 0,
  gamemode: undefined //redOrBlack, pickASuit
});

export let state = reactive(initialState());

export const computeds = {
  currentCard: computed(() => state.cards[state.cardIdx]),
  cardsOnTable: computed(() => {
    if (state.gamemode === "redOrBlack") {
      return state.playedCards.slice(Math.max(state.playedCards.length - 5, 0));
    } else {
      return state.playedCards.slice(
        Math.max(state.playedCards.length - state.scoreStreak, 0)
      );
    }
  }),
  cardsLeft: computed(() => state.cards.length - state.playedCards.length),
  currentOption: computed(() => {
    if (state.gamemode === "redOrBlack") {
      return options[0];
    } else if (state.gamemode === "pickASuit") {
      return options[state.scoreStreak];
    }
  })
};

function isHigherOrLower(answer) {}
function isInOrOut(answer) {}
function chooseSuit(answer) {}

export const actions = {
  buildDeck() {
    let id = 1;
    for (const suit of Object.entries(suits)) {
      for (let r = 0; r < ranks.length; r++) {
        let card = {
          id: id,
          rank: ranks[r],
          suit: suit[0],
          color: suit[1]
        };

        state.cards.push(card);
        id++;
      }
    }
  },

  shuffleCards() {
    for (let index = state.cards.length; index > 0; index--) {
      let randomIndex = Math.floor(Math.random() * index);

      let temp = state.cards[index];
      if (temp) {
        Vue.set(state.cards, index, state.cards[randomIndex]);
        Vue.set(state.cards, randomIndex, temp);
      }
    }
  },

  setGameMode(routeName) {
    const gameName = routeName.slice(5);
    state.gamemode = gameName;
  },

  checkAnswer(option) {
    let answer;

    if (state.gamemode === "pickASuit") {
      answer = options[state.scoreStreak][option].toLowerCase();

      switch (state.scoreStreak) {
        case 0:
          return answer === computeds.currentCard.value.color;
        case 1:
          return isHigherOrLower(answer);
        case 2:
          return isInOrOut(answer);
        case 3:
          return chooseSuit(answer);
      }
    } else {
      answer = options[0][option].toLowerCase();
      return answer === computeds.currentCard.value.color;
    }
  },

  nextCard(option) {
    // right or left
    const { createNotification } = useNotifications();
    let isCorrect = actions.checkAnswer(option);

    if (isCorrect) {
      // CORRECT
      state.scoreStreak += 1;
      createNotification({ type: "correct", message: "Eyyyyyyy sickk" });
      // show notification
    } else {
      // state.cardsOnTable.slice(0);
      createNotification({ type: "wrong", message: "Haha n00b" });
      state.scoreStreak = 0;
    }
    // console.log(state.playedCards);
    state.playedCards.push(computeds.currentCard.value);
    state.cardIdx++;
  },

  resetDeck() {
    const s = initialState();
    Object.keys(s).forEach(key => {
      state[key] = s[key];
    });
  }
};

export const key = Symbol("CardsStore");

export function provideCards() {
  provide(key, {
    ...toRefs(state),
    ...computeds,
    ...actions
  });
}

export function useCards() {
  const store = inject(key);

  if (!store) {
    // hmhmhmhmhm
  }

  return store;
}
