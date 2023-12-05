<template>
  <q-card v-if="store.input_image">
    <q-card-section v-if="store.input_image" >
      <div class="flex q-gutter-md">
        <q-input v-model="store.prompt" label="prompt" style="flex:1"/>
        <q-btn
          icon="start"
          label="Run"
          color="primary"
          @click="store.controlnet_run()"
        />
    </div>
    </q-card-section>
    <q-card-section>
      {{ decodeURIComponent(store.input_image) }}
      <div class="flex q-gutter-md">
        <q-img style="flex: 1" :src="store.input_image" />
        <q-img style="flex: 1" :src="store.input_image" />
      </div>
    </q-card-section>
    <q-card-section>
      <q-img style="flex: 1" :src="store.input_image" />
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent } from "vue";
import { useAibroStore } from "src/stores/aibro-store";
import { useControlnetStore } from "src/stores/controlnet-store";

export default defineComponent({
  name: "ControlNet",
  setup() {
    const store = useControlnetStore();
    return {
      store,
    };
  },
});
</script>
