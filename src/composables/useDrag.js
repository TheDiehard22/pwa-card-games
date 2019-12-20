import Hammer from "hammerjs";
import { unwrap } from "./utils";
import { computed, ref, toRefs, onMounted } from "@vue/composition-api";
import { throttle } from "lodash-es";

export function useDrag(el = ref(null), swipeCb = null) {
  let hammer;

  const maxDistance = 130;
  const minimalPercentage = 70;
  const offsetPercentage = computed(() => (distance.value / maxDistance) * 100);
  let distance = ref(0);
  let panEnded = ref(false);

  function swipeAction() {
    const swipeDirection = offsetPercentage.value >= 0 ? "right" : "left";
    // convert negative number to positive
    if (Math.abs(offsetPercentage.value) > minimalPercentage) {
      // execute callback when you swiped enough righ or left
      if (!swipeCb) {
        return console.warn("No callback received.");
      }
      swipeCb(swipeDirection);
    }
  }

  // TODO: Implement lodash throttling for better performance
  onMounted(() => {
    el = unwrap(el);

    if (el) {
      el = el.$el;
      hammer = new Hammer(el, { threshold: 0 });

      hammer.on(
        "panmove",
        throttle(e => {
          if (!panEnded) distance.value = e.deltaX;
          panEnded = false;
        }, 30)
      );

      hammer.on("panend", e => {
        panEnded = true;
        swipeAction();
        distance.value = 0;
        console.log("pan ended");
      });
    }
  });

  return {
    offsetPercentage
  };
}
