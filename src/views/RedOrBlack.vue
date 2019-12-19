<template>
  <div class="home flex flex-col h-full p-4">
    <!-- {{ currentCard }} <br />
    {{ scoreStreak }} -->

    <div class="flex my-6">
      <div class="w-1/2 flex">
        <button
          @click="nextCard('left')"
          class="border border-gray-700 flex-grow"
        >
          Rood
        </button>
      </div>
      <div class="w-1/2 flex">
        <button
          @click="nextCard('right')"
          class="border border-gray-700 flex-grow"
        >
          Zwart
        </button>
      </div>
      <button class="border border-gray-700 px-6 py-2" @click="shuffleCards()">
        shufleeee
      </button>
    </div>
    <div class="flex flex-grow items-start justify-center">
      <base-card :styles="cardStyles" ref="cardRef" :small="false"></base-card>
    </div>
  </div>
</template>

<script>
import { useCards } from "@/store/modules/cards";
import BaseCard from "../components/BaseCard.vue";
import { ref, onMounted, computed } from "@vue/composition-api";
import { useDrag } from "@/composables/useDrag";
// import { useCards } from "@/composables/cards";

export default {
  name: "RedOrBlack",

  components: {
    BaseCard
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
    const { offsetPercentage } = useDrag(cardRef, nextCard); //must be declared here and is reassigned in onMounted

    const cardStyles = computed(() => {
      const transform = {
        transform: `translateX(${
          offsetPercentage.value
        }%) rotate(${offsetPercentage.value / 5}deg)`
      };

      return [transform];
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
