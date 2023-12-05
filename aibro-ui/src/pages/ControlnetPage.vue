<template>
  <q-page style="height: 300px" >
    <ControlNet></ControlNet>
  </q-page>
</template>

<script>
import ControlNet from "src/components/ControlNet.vue";
import { defineComponent } from "vue";

export default defineComponent({
    name: "ControlnetPage",
    components: { ControlNet }
});
</script>
