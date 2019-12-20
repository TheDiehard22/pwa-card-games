<template>
  <nav v-if="isHome" class="menu">
    <ul>
      <li
        class="menu-list-item"
        v-for="(item, index) in menuItems"
        :key="index"
        v-ripple
      >
        <router-link class="menu-list-link" :to="item.to">
          <span class="block font-medium">{{ item.label }}</span>
          <span class="block">{{ item.description }}</span>
        </router-link>
      </li>
    </ul>
  </nav>
  <div class="playfield flex flex-col px-4 pt-2 pb-4" v-else>
    <div class="flex justify-between mb-2">
      <span>
        <b>{{ cardsLeft }}</b>
        cards left
      </span>

      <span>
        <b class="font-bold">{{ scoreStreak }}</b>
        in a row
      </span>
    </div>
    <transition-group tag="div" class="flex" name="card">
      <template v-for="card in cardsOnTable">
        <base-card
          :key="`${card.suit}-${card.rank}`"
          :suit="card.suit"
          :rank="card.rank"
          :color="card.color"
        ></base-card>
      </template>
    </transition-group>
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

<style lang="scss">
.card {
  &-enter {
    opacity: 0;
    transform: perspective(500px) translateZ(200px) translateX(40px);
  }
  &-leave-to {
    transform: translateX(-40px);
    opacity: 0;
    position: absolute;
  }

  &-enter-active {
    transition: ease-in transform 0.6s, opacity linear 0.15s;
  }

  &-leave-active {
    transition: ease-in transform 1s, opacity linear 0.6s;
    position: absolute !important;
  }

  &-move {
    transition: transform linear 0.5s;
  }
}
</style>
