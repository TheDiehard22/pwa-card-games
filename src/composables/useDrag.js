import Hammer from "hammerjs";
import { unwrap } from "./utils";
import { computed, ref, toRefs, onMounted } from "@vue/composition-api";

export function useDrag(el = ref(null), swipeCb = null) {
  let hammer;

  const maxDistance = 150;
  const minimalPercentage = 80;
  const offsetPercentage = computed(() => {
    let value =
      centerX.value >= startCenterX.value
        ? (distance.value / maxDistance) * 100
        : -(distance.value / maxDistance) * 100;
    return value;
  });
  let startCenterX = ref(null);
  let centerX = ref(0);
  let distance = ref(0);

  function swipeAction() {
    const swipeDirection = offsetPercentage.value >= 0 ? "right" : "left";
    // convert negative number to positive
    if (Math.abs(offsetPercentage.value) > minimalPercentage) {
      // execute callback when you swiped enough righ or left
      if (!swipeCb) {
        return console.warn("No callback received.");
      }
      console.log(swipeDirection);
      swipeCb(swipeDirection);
    }
  }

  onMounted(() => {
    el = unwrap(el);

    if (el) {
      el = el.$el;
      hammer = new Hammer(el, { threshold: 0 });

      hammer.on("panleft panright", e => {
        if (!startCenterX.value) startCenterX.value = e.center.x;
        centerX.value = e.center.x;
        distance.value = e.distance;

        // console.log(
        //   e.type,
        //   e.distance,
        //   `center - x: ${e.center.x} y: ${e.center.y}`
        //   // e
        // );
      });

      hammer.on("panend", e => {
        swipeAction();
        distance.value = 0;
        startCenterX.value = null;
        console.log("pan ended");
      });
    }
  });

  return {
    offsetPercentage
  };
}
