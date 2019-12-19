<template>
  <nav v-if="isHome" class="menu">
    <ul>
      <li
        class="menu-list-item"
        v-for="(item, index) in menuItems"
        :key="index"
      >
        <router-link class="menu-list-link" :to="item.to">
          <span class="block font-medium">{{ item.label }}</span>
          <span class="block">{{ item.description }}</span>
        </router-link>
      </li>
    </ul>
  </nav>
  <div class="playfield flex flex-col px-4 py-2" v-else>
    <div class="flex mb-2">
      <span>
        Nog
        <b>{{ cardsLeft }}</b>
        kaarten over.
      </span>
    </div>
    <div class="flex">
      <template v-for="(card, index) in cardsOnTable">
        <base-card
          :key="index"
          :suit="card.suit"
          :rank="card.rank"
          :color="card.color"
        ></base-card>
      </template>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed } from "@vue/composition-api";
import { useRouter } from "@/composables/route.js";
import BaseCard from "@/components/BaseCard.vue";
import { useCards } from "@/store/modules/cards";

export default {
  name: "AppMenu",

  components: {
    BaseCard
  },

  setup(props, context) {
    const menuItems = [
      {
        label: "Red or Black",
        description: "Uitleg hier",
        to: "/red-or-black"
      },
      { label: "Pick a suit", description: "Uitleg hier", to: "/red-or-black" }
      // { label: "Suckkkk", description: "Uitleg hier", to: "/red-or-black" }
    ];
    const { router, route } = useRouter(context);
    const isHome = computed(() => {
      return route.value.name === "home";
    });
    const { cardsOnTable, playedCards, scoreStreak, cardsLeft } = useCards();

    return {
      menuItems,
      isHome,
      cardsOnTable,
      playedCards,
      scoreStreak,
      cardsLeft
    };
  }
};
</script>
