<template>
  <div
    v-if="small"
    class="playingcard"
    :class="{
      'playingcard--small': small,
      'playingcard--red': color === 'red'
    }"
    :style="styles"
  >
    <span class="playingcard-suit playingcard-suit--top">{{ suit }}</span>
    <span class="playingcard-rank">{{ rank }}</span>
    <span class="playingcard-suit playingcard-suit--bottom">{{ suit }}</span>
  </div>
  <div
    ref="cardRef"
    v-else
    class="playingcard playingcard--flip"
    :class="{
      'playingcard--red': color === 'red'
    }"
  >
    <!-- :style="cardStyles" -->
    <div class="playingcard-inner">
      <div class="playingcard-back"></div>
      <div class="playingcard-front">
        <span class="playingcard-suit playingcard-suit--top">{{ suit }}</span>
        <span class="playingcard-rank">{{ rank }}</span>
        <span class="playingcard-suit playingcard-suit--bottom">{{
          suit
        }}</span>
      </div>
    </div>
    <!-- <div class="playingcard-background"></div> -->
  </div>
</template>

<script>
import { useDrag } from "@/composables/useDrag";
import { ref, computed, watch, onMounted } from "@vue/composition-api";
import anime from "animejs/lib/anime.es.js";

export default {
  name: "BaseCard",
  props: {
    suit: {
      type: String,
      default: "♥"
    },
    rank: {
      type: String,
      default: "A"
    },
    small: {
      type: Boolean,
      default: true
    },
    color: {
      type: String,
      default: null
    },
    styles: {
      type: [Array, Object]
    }
  },

  setup(props, { emit }) {
    if (!props.small) {
      const cardRef = ref(null);
      const { offsetPercentage, lastSwipeDirection } = useDrag(cardRef);
      const cardTimeline = anime.timeline({
        autoplay: false
      });
      let timelineDuration = ref(0);

      watch(lastSwipeDirection, val => {
        val && emit("swiped", val);
      });

      watch(offsetPercentage, () => {
        if (timelineDuration.value > 0) {
          cardTimeline.seek(
            (timelineDuration.value * Math.abs(offsetPercentage.value)) / 100
          );
        }
      });

      onMounted(() => {
        cardTimeline.add({
          targets: cardRef.value,
          scale: [
            { value: [1, 1.15], easing: "linear", duration: 600 },
            { value: [1.15, 1], easing: "linear", duration: 600 }
          ],
          rotateY: [
            {
              value: [0, 180],
              duration: 800,
              delay: 300,
              easing: "easeInOutSine"
            }
          ]
        });
        timelineDuration.value = cardTimeline.duration;
      });

      return { cardRef };
    }
  }
};
</script>
