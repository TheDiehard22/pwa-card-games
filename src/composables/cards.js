import Vue from "vue";
import { ref, reactive, toRefs, computed } from "@vue/composition-api";
import { shuffle } from "lodash-es";

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
const state = reactive({
  cards: [],
  playedCards: [],
  scoreStreak: 0,
  cardsOnTable: [],
  cardIdx: 0,
  currentCard: computed(() => state.cards[state.cardIdx])
});

export function useCards() {
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

  shuffleCards();

  function shuffleCards() {
    // for (let index = state.cards.length; index > 0; index--) {
    //   let randomIndex = Math.floor(Math.random() * index);

    //   let temp = state.cards[index];
    //   if (temp) {
    //     Vue.set(state.cards, index, state.cards[randomIndex]);
    //     Vue.set(state.cards, randomIndex, temp);
    //   }
    // }

    shuffle(state.cards);
  }

  function nextCard(option) {
    console.log(state);
    const cardColor = suits[state.currentCard.suit];
    // red or black for now
    console.log(option, cardColor);
    if (option === cardColor) {
      // CORRECT
      state.cardsOnTable.push(state.currentCard);
      state.scoreStreak + 1;
    } else {
      state.cardsOnTable.slice(0);
      state.scoreStreak = 0;
    }
    state.playedCards.push(state.currentCard);
    state.cardIdx++;
  }

  return { ...toRefs(state), shuffleCards, nextCard };
}
