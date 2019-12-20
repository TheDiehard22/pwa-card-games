<template>
  <div class="home flex flex-col h-full p-4">
    <swipe-confirmation
      :percentage-complete="offsetPercentage"
    ></swipe-confirmation>
    <div class="flex flex-grow items-center justify-center">
      <base-card :styles="cardStyles" ref="cardRef" :small="false"></base-card>
    </div>
  </div>
</template>

<script>
import { useCards } from "@/store/modules/cards";
import BaseCard from "../components/BaseCard.vue";
import SwipeConfirmation from "@/components/SwipeConfirmation.vue";
import { ref, onMounted, computed } from "@vue/composition-api";
import { useDrag } from "@/composables/useDrag";

export default {
  name: "RedOrBlack",

  components: {
    BaseCard,
    SwipeConfirmation
  },

  setup() {
    const cardRef = ref({}); // this is a template ref
    const {
      currentCard,
      shuffleCards,
      nextCard,
      buildDeck,
      cards,
      scoreStreak
    } = useCards();
    const { offsetPercentage } = useDrag(cardRef, nextCard);

    const cardStyles = computed(() => {
      const transform = {
        transform: `translateX(${
          offsetPercentage.value
        }%) rotate(${offsetPercentage.value / 5}deg)`
      };

      return [transform];
    });
    const dropletStyles = computed(() => {
      return [{ transform: `translateX(${offsetPercentage}%)` }];
    });

    if (cards.value.length === 0) {
      buildDeck();
      shuffleCards();
    }

    return {
      cards,
      currentCard,
      shuffleCards,
      nextCard,
      buildDeck,
      cardRef,
      cardStyles,
      offsetPercentage,
      scoreStreak
    };
  }
};
</script>
