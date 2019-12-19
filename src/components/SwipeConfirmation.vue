<template>
  <div>
    <div ref="confirmLeftRef" class="droplet droplet--red">
      <span class="droplet-action-name">Red</span>
    </div>
    <div ref="confirmRightRef" class="droplet droplet--black">
      <span class="droplet-action-name ">Black</span>
    </div>
  </div>
</template>

<script>
import anime from "animejs/lib/anime.es.js";
import {
  ref,
  onMounted,
  reactive,
  computed,
  watch
} from "@vue/composition-api";

export default {
  name: "SwipeConfirmation",
  props: {
    percentageComplete: {
      type: Number,
      default: 0
    }
  },

  setup(props) {
    const confirmLeftRef = ref(null);
    const confirmRightRef = ref(null);
    let tlLeft = anime.timeline({
      autoplay: false
    });
    let tlRight = anime.timeline({
      autoplay: false
    });
    let tlDuration = 1000;
    // const seekPercentage = ref(0);
    watch(() => {
      if (props.percentageComplete <= 0) {
        tlLeft.seek(tlDuration * (Math.abs(props.percentageComplete) / 100));
      }
      if (props.percentageComplete >= 0) {
        tlRight.seek(tlDuration * (Math.abs(props.percentageComplete) / 100));
      }
    });

    onMounted(() => {
      tlLeft.add({
        targets: confirmLeftRef.value,
        opacity: [0, 1],
        duration: tlDuration,
        easing: "cubicBezier(.5, .05, .1, .3)"
      });
      tlRight.add({
        targets: confirmRightRef.value,
        opacity: [0, 1],
        duration: tlDuration,
        easing: "cubicBezier(.5, .05, .1, .3)"
      });

      tlDuration = tlLeft.duration;
    });

    return { confirmLeftRef, confirmRightRef };
    // const animation =
  }
};
</script>

<style lang="scss" scoped></style>
