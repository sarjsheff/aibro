<template>
  <q-page class="flex q-pa-md content-stretch items-stretch justify-stretch column" style="height: 100px;flex-wrap: nowrap;">
    <Txt2Txt v-if="store.procs?.txt2txt?.is_alive" style="flex:1"></Txt2Txt>
  </q-page>
</template>

<script>
import Txt2Txt from "src/components/Txt2Txt.vue";
import { defineComponent } from "vue";
import { useAibroStore } from "src/stores/aibro-store";

export default defineComponent({
  name: "Txt2TxtPage",
  components: { Txt2Txt },
  setup() {
    const  store = useAibroStore()
    return {store}
  }
});
</script>
