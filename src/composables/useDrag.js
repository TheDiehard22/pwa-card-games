import Hammer from "hammerjs";
import { unwrap } from "./utils";
import { computed, ref, toRefs, onMounted } from "@vue/composition-api";
import { throttle } from "lodash-es";

export function useDrag(el = ref(null)) {
  let hammer;

  const maxDistance = 130;
  const minimalPercentage = 70;
  const offsetPercentage = computed(() => {
    const maxPercentage = 100;
    let percentage = (distance.value / maxDistance) * 100;
    if (percentage > maxPercentage) percentage = maxPercentage;

    return percentage;
  });
  let distance = ref(0);
  let panEnded = ref(false);
  let lastSwipeDirection = ref(null);

  function swipeAction() {
    const swipeDirection = offsetPercentage.value >= 0 ? "right" : "left";
    // convert negative number to positive
    if (Math.abs(offsetPercentage.value) > minimalPercentage) {
      lastSwipeDirection.value = swipeDirection;
      distance.value = 0;

      setTimeout(() => {
        lastSwipeDirection.value = null;
      }, 1000);
    }
  }

  onMounted(() => {
    el = unwrap(el);

    if (el) {
      // el = el.$el;
      hammer = new Hammer(el, { threshold: 0 });

      hammer.on(
        "panmove",
        throttle(e => {
          if (!panEnded) distance.value = e.deltaX;
          panEnded = false;
        }, 20)
      );

      hammer.on("panend", e => {
        panEnded = true;
        swipeAction();

        console.log("pan ended at swipe direction: ", lastSwipeDirection.value);
      });
    }
  });

  return {
    offsetPercentage,
    lastSwipeDirection
  };
}
