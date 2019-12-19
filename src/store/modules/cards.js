import {
  reactive,
  computed,
  provide,
  toRefs,
  inject,
  readonly
} from "@vue/composition-api";
import Vue from "vue";

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

export const key = Symbol("CardsStore");

const initialState = {
  cards: [],
  playedCards: [],
  scoreStreak: 0,
  cardIdx: 0
};
export const state = reactive(initialState);

export const computeds = {
  currentCard: computed(() => state.cards[state.cardIdx]),
  cardsOnTable: computed(() =>
    state.playedCards.slice(Math.max(state.playedCards.length - 5, 0))
  ),
  cardsLeft: computed(() => state.cards.length - state.playedCards.length)
};

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

  shuffleCards(payload) {
    for (let index = state.cards.length; index > 0; index--) {
      let randomIndex = Math.floor(Math.random() * index);

      let temp = state.cards[index];
      if (temp) {
        Vue.set(state.cards, index, state.cards[randomIndex]);
        Vue.set(state.cards, randomIndex, temp);
      }
    }
  },

  nextCard(option) {
    // right or left
    const cardColor = computeds.currentCard.value.color; // red or black
    let chosenColor;

    switch (option) {
      case "left":
        chosenColor = "red";
        break;
      case "right":
        chosenColor = "black";
        break;
    }
    console.log(chosenColor, cardColor);
    if (chosenColor === cardColor) {
      // CORRECT
      state.scoreStreak += 1;
    } else {
      // state.cardsOnTable.slice(0);
      state.scoreStreak = 0;
    }
    // console.log(state.playedCards);
    state.playedCards.push(computeds.currentCard.value);
    state.cardIdx++;
  }
};

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
