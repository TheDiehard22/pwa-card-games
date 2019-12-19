import { watch, ref, computed } from "@vue/composition-api";

export function useRouter(context) {
  const router = context.root.$router;
  const route = ref(context.root.$route);
  const inGame = computed(() => {
    if (route.value.name) {
      return route.value.name.startsWith("game-");
    }
    return false;
  });

  watch(
    () => {
      return context.root.$route;
    },
    r => {
      route.value = r;
    }
  );

  return { router, route, inGame };
}
