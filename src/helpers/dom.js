import { onMounted } from "@vue/composition-api";
import { unwrap } from "../composables/utils";

export function outsideClick(insideEl = ref(null), closeCb) {
  insideEl = unwrap(insideEl);
  console.log(insideEl);

  function clickListener(evt) {
    let targetEl = evt.target;
    console.log(targetEl);
    do {
      if (targetEl == insideEl) {
        // This is a click inside. Do nothing, just return.
        return;
      }
      // Go up the DOM
      targetEl = targetEl.parentNode;
    } while (targetEl);

    // when the code reaches here - outside is clicked
    document.removeEventListener("click", clickListener);
    closeCb();
  }

  document.addEventListener("click", clickListener);
}
