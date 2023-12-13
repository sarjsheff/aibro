<template>
  <q-page class="flex align-center justify-center row">
    <q-list class="col-6">
      <q-item-label header>Services</q-item-label>

      <q-item v-for="(v, k) in store.procs" :key="k">
        <q-item-section>
          <q-item-label lines="1">{{ k }}</q-item-label>
          <q-item-label caption>{{
            v.is_alive ? "Started" : "Stopped"
          }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-toggle
            toggle-indeterminate
            color="blue"
            :modelValue="store.procs[k].is_alive"
            @update:model-value="store.stopstart_proc(k)"
          />
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { useAibroStore } from "src/stores/aibro-store";

export default defineComponent({
  name: "ServicesPage",
  setup() {
    const store = useAibroStore();
    return { store };
  },
});
</script>
