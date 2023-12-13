<template>
  <q-card class="fit column" style="flex: 1">
    <q-card-section style="flex: 1; overflow-y: scroll">
      <div
        v-if="store.txt2txt.history"
        style="flex: 1;"
      >
        <q-chat-message
          v-for="(m, i) in store.txt2txt.history"
          :key="i"
          :name="m.role"
          :text="[m.message]"
          :sent="m.role == 'user'"
        />
        <q-chat-message
          v-if="store.loading"
          name="user"
          sent
          :message="[store.txt2txt.prompt]"
        />
        <q-chat-message v-if="store.loading" name="bot">
          <q-spinner-dots size="2rem" />
        </q-chat-message>
      </div>
    </q-card-section>
    <q-card-section class="q-gutter-md" style="flex: 0">
      <q-input outlined grow v-model="store.txt2txt.prompt" />
    </q-card-section>
    <q-card-actions style="flex: 0">
      <q-btn
        :disabled="store.loading"
        icon="start"
        label="Run"
        color="primary"
        :loading="store.loading"
        @click="store.txt2txt_run(name)"
      />
      <q-btn
        :disabled="store.loading"
        icon="delete"
        label="Clear"
        color="primary"
        @click="store.txt2txt_reset()"
      />
    </q-card-actions>
    <!-- <q-inner-loading :showing="store.loading" size="10rem" /> -->
  </q-card>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from "vue";
import axios from "axios";
import { useQuasar } from "quasar";
import { date } from "quasar";
import { useAibroStore } from "src/stores/aibro-store";

export default defineComponent({
  name: "Txt2Txt",
  props: {
    name: {
      type: String,
      default: "txt2txt",
    },
  },
  setup() {
    const $q = useQuasar();
    const store = useAibroStore();

    onMounted(() => {});

    return {
      store,
    };
  },
});
</script>
