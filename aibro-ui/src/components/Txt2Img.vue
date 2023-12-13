<template>
  <q-card class="fit">
    <q-card-section>
      <q-btn-toggle
        v-model="store.job_type"
        push
        glossy
        toggle-color="primary"
        :options="[
          { label: 'SDXL 1.0', value: 0 },
          { label: 'SDXL ControlNet', value: 1 },
        ]"
      />
    </q-card-section>
    <q-card-section v-if="store.job_type == 1">
      <q-input
        v-model="store.input_image"
        label="input image"
      />
      <q-input
        v-model="store.controlnet_conditioning_scale"
        label="controlnet_conditioning_scale"
      />
    </q-card-section>
    <q-card-section>
      <div class="flex q-gutter-md">
        <q-input
          style="flex: 1"
          v-model="store.prompt"
          label="prompt"
          hint="The prompt or prompts to guide the image generation. If not defined, one has to pass prompt_embeds. instead."
        /><q-btn
          icon="start"
          label="Run"
          color="primary"
          @click="store.txt2img_run()"
        />
      </div>
      <q-input v-model="store.negative_prompt" label="negative_prompt" />
      <q-input v-model="store.prompt_script" label="prompt_script" autogrow />
      <q-input v-model.number="store.seed" label="seed" type="number" />
      <q-input v-model.number="store.width" label="width" type="number" />
      <q-input v-model.number="store.height" label="height" type="number" />
      <q-input
        v-model.number="store.num_inference_steps"
        label="num_inference_steps"
        type="number"
      />
    </q-card-section>

    <q-expansion-item
      switch-toggle-side
      expand-separator
      label="Extra"
      caption="Extra params"
    >
      <q-card-section>
        <q-input
          v-model.number="store.guidance_scale"
          label="guidance_scale"
          type="number"
        />
        <q-input
          v-model.number="store.guidance_rescale"
          label="guidance_rescale"
          type="number"
        />
        <q-input
          v-model.number="store.original_size_width"
          label="original_size_width"
          type="number"
        />
        <q-input
          v-model.number="store.original_size_height"
          label="original_size_height"
          type="number"
        />
        <q-input
          v-model.number="store.target_size_width"
          label="target_size_width"
          type="number"
        />
        <q-input
          v-model.number="store.target_size_height"
          label="target_size_height"
          type="number"
        />
        <q-input
          v-model.number="store.crops_coords_top_left_x"
          label="crops_coords_top_left_x"
          type="number"
        />
        <q-input
          v-model.number="store.crops_coords_top_left_y"
          label="crops_coords_top_left_y"
          type="number"
        />
      </q-card-section>
    </q-expansion-item>
    <q-card-section v-if="store.output_image">
      <q-img :src="store.output_image"></q-img>
      <q-img v-if="store.job_type == 1" :src="store.output_image.replace('.png','_canny.png')"></q-img>
    </q-card-section>
    <q-card-section>
      <q-btn label="Run" color="primary" @click="store.txt2img_run()" />
    </q-card-section>
    <q-inner-loading
      :showing="store.loading"
      :label="store.since"
      size="10rem"
    />
  </q-card>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from "vue";
import axios from "axios";
import { useQuasar } from "quasar";
import { date } from "quasar";
import { useAibroStore } from "src/stores/aibro-store";

export default defineComponent({
  name: "Txt2Img",
  setup() {
    const $q = useQuasar();
    const store = useAibroStore();

    const gett = (k, def) => {
      try {
        return $q.localStorage.getItem("txt2img_" + k) || def;
      } catch (e) {
        $q.notify(`Error load params: ${e}`);
        return def;
      }
    };

    const sett = (k, v) => {
      if (v) {
        try {
          $q.localStorage.set("txt2img_" + k, v);
        } catch (e) {
          $q.notify(`Error save params: ${e}`);
        }
      } else {
        $q.localStorage.remove("txt2img_" + k);
      }
    };

    const job_id = ref(gett("job_id", undefined));
    onMounted(() => {
      const id = gett("job_id", "undefined");
      console.log(id);
      if (id !== "undefined") {
        store.loading = true;
        store.txt2img_check(id, []);
      }
      store.reload_history();
    });
    return {
      store,
      job_id,
    };
  },
});
</script>
