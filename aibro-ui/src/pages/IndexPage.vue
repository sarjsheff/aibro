<template>
  <q-page class="flex">
    <Txt2Img></Txt2Img>
  </q-page>
</template>

<script>
import Txt2Img from "src/components/Txt2Img.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "IndexPage",
  components: { Txt2Img },
});
</script>
