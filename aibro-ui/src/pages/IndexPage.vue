<template>
  <q-page class="flex">
    <Txt2Img v-if="store.txt2img.is_alive"></Txt2Img>
  </q-page>
</template>

<script>
import Txt2Img from "src/components/Txt2Img.vue";
import { defineComponent } from "vue";
import { useAibroStore } from "src/stores/aibro-store";

export default defineComponent({
  name: "IndexPage",
  components: { Txt2Img },
  setup() {
    const  store = useAibroStore()
    return {store}
  }
});
</script>
