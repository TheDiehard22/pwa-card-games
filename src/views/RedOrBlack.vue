<template>
  <div class="home flex flex-col h-full p-4">
    <swipe-confirmation
      class="z-1 select-none"
      :percentage-complete="offsetPercentage"
    ></swipe-confirmation>
    <div class="flex flex-col flex-grow items-center z-10">
      <!-- <button class="z-10" @click="nextCard('right')">Blackkkk</button> -->
      <span class="game-question text-2xl font-bold mb-6 mt-2">
        {{ currentOption.question }}
      </span>
      <base-card
        v-show="!displaySuits"
        :styles="cardStyles"
        ref="cardRef"
        :small="false"
      ></base-card>
      <div
        class="text-black text-4xl bg-white shadow-lg flex flex-wrap self-stretch mx-10 rounded"
        v-show="displaySuits"
      >
        <div
          class="w-1/2 h-12 py-8 flex items-center justify-center text-red-600"
          @click="nextTurn('topleft')"
        >
          <span class="block">♥</span>
        </div>
        <div
          class="w-1/2 h-12 py-8 flex items-center justify-center"
          @click="nextTurn('topright')"
        >
          <span class="block">♠</span>
        </div>
        <div
          class="w-1/2 h-12 py-8 flex items-center justify-center"
          @click="nextTurn('bottomleft')"
        >
          <span class="block">♣</span>
        </div>
        <div
          class="w-1/2 h-12 py-8 flex items-center justify-center text-red-600"
          @click="nextTurn('bottomright')"
        >
          <span class="block">♦</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useCards } from "@/store/modules/cards";
import BaseCard from "../components/BaseCard.vue";
import SwipeConfirmation from "@/components/SwipeConfirmation.vue";
import { ref, onMounted, computed, watch } from "@vue/composition-api";
import { useDrag } from "@/composables/useDrag";
import { useSound } from "@/composables/useSound";
import { useRouter } from "@/composables/route.js";

export default {
  name: "RedOrBlack",

  components: {
    BaseCard,
    SwipeConfirmation
  },

  setup(props, context) {
    const cardRef = ref(null); // this is a template ref
    const {
      currentCard,
      shuffleCards,
      nextCard,
      buildDeck,
      cards,
      scoreStreak,
      cardsLeft,
      resetDeck,
      setGameMode,
      currentOption,
      displaySuits
    } = useCards();
    const { route } = useRouter(context);
    const { offsetPercentage, lastSwipeDirection } = useDrag(cardRef);
    const { play } = useSound();
    const cardStyles = computed(() => {
      const transform = {
        transform: `translateX(${
          offsetPercentage.value
        }%) rotate(${offsetPercentage.value / 5}deg)`
      };

      return [transform];
    });

    function nextTurn(actionName) {
      const { isCorrect } = nextCard(actionName);
      play(isCorrect);
    }

    watch(cardsLeft, () => {
      if (cardsLeft.value === 0) {
        resetDeck();
        buildDeck();
        shuffleCards();
        // show Modal
      }
    });

    watch(route, (val, oldVal) => {
      setGameMode(route.value.name);
    });

    watch(lastSwipeDirection, val => {
      val && nextTurn(val);
    });

    return {
      cards,
      currentCard,
      shuffleCards,
      nextCard,
      buildDeck,
      cardRef,
      cardStyles,
      offsetPercentage,
      scoreStreak,
      cardsLeft,
      resetDeck,
      currentOption,
      displaySuits,
      nextTurn
    };
  }
};
</script>
