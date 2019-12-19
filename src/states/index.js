import { reactive, computed } from "@vue/composition-api";

export const cardState = () =>
  reactive({
    cards: [],
    playedCards: [],
    scoreStreak: 0,
    cardsOnTable: [],
    cardIdx: 0,
    currentCard: computed(() => cards[cardIdx])
  });
