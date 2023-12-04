<template>
  <q-list>
    <q-item-label header> History </q-item-label>
    <!-- <q-intersection v-for="index in store.history" :key="index"> -->
    <q-card
      flat
      bordered
      class="q-ma-sm"
      v-for="index in store.history"
      :key="index.id"
    >
      <q-img :src="`/output/${encodeURIComponent(index.id)}/image.png`" />

      <q-card-section>
        <q-btn
          fab-mini
          color="secondary"
          icon="content_copy"
          class="absolute"
          style="top: 0; right: 46px; transform: translateY(-60%)"
          @click="store.copy_history(index)"
        />
        <q-btn
          fab-mini
          color="accent"
          icon="delete"
          class="absolute"
          @click="del(index)"
          style="top: 0; right: 0px; transform: translateY(-60%)"
        />
        <div class="text-h8">{{ index.id }}</div>
        <div class="text-weight-bold">{{ index.prompt }}</div>
        <div class="text-weight-bold text-red">
          {{ index.negative_prompt }}
        </div>
        <div class="text-caption">seed: {{ index.seed }}</div>
      </q-card-section>
    </q-card>
    <!-- </q-intersection> -->
    <q-inner-loading :showing="store.loading_history" />
  </q-list>
</template>

<script>
import { useAibroStore } from "src/stores/aibro-store";
import { defineComponent } from "vue";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "HistoryList",
  setup() {
    const store = useAibroStore();
    const $q = useQuasar();
    return {
      store,
      del(index) {
        $q.dialog({
          title: "Confirm",
          message: "Delete item?",
          cancel: true,
          persistent: true,
        }).onOk(() => {
          store.del_history(index);
        });
      },
    };
  },
});
</script>
