<template>
  <router-view />
</template>

<script>
import { defineComponent, onMounted } from "vue";
import { useAibroStore } from "src/stores/aibro-store";

export default defineComponent({
  name: "App",
  setup() {
    const store = useAibroStore();
    onMounted(() => store.load_procs());
    return {};
  },
});
</script>
