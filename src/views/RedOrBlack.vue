<template>
  <div class="home flex flex-col h-full p-4">
    <swipe-confirmation
      class="z-1"
      :percentage-complete="offsetPercentage"
    ></swipe-confirmation>
    <div class="flex flex-col flex-grow items-center">
      <!-- <button class="z-10" @click="nextCard('right')">Blackkkk</button> -->
      <span class="game-question text-2xl font-bold mb-6 mt-2">
        {{ currentOption.question }}
      </span>
      <base-card :styles="cardStyles" ref="cardRef" :small="false"></base-card>
    </div>
  </div>
</template>

<script>
import { useCards } from "@/store/modules/cards";
import BaseCard from "../components/BaseCard.vue";
import SwipeConfirmation from "@/components/SwipeConfirmation.vue";
import { ref, onMounted, computed, watch } from "@vue/composition-api";
import { useDrag } from "@/composables/useDrag";
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
      currentOption
    } = useCards();
    const { route } = useRouter(context);
    const { offsetPercentage } = useDrag(cardRef, nextCard);
    const cardStyles = computed(() => {
      const transform = {
        transform: `translateX(${
          offsetPercentage.value
        }%) rotate(${offsetPercentage.value / 5}deg)`
      };

      return [transform];
    });
    const cardsLength = watch(cardsLeft, () => {
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
      currentOption
    };
  }
};
</script>
