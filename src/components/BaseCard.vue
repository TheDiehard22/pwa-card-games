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
  <div v-else class="playingcard playingcard--back" :style="styles">
    <div class="playingcard-background"></div>
  </div>
</template>

<script>
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
  }
};
</script>

<style lang="scss" scoped></style>
