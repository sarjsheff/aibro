<template>
  <q-table
    class="aibro-gallery"
    title="Gallery"
    :rows="rows"
    :columns="cols"
    row-key="id"
    :grid="grid_view"
    :loading="store.loading_history"
    @request="onRequest"
    v-model:pagination="pagination"
  >
    <template v-slot:body-cell-negative_prompt="props">
      <q-td :props="props">
        <div class="text-red">
          {{ props.value }}
        </div>
      </q-td>
    </template>
    <template v-slot:top-right>
      <q-toggle
        v-model="grid_view"
        checked-icon="grid_view"
        unchecked-icon="view_list"
        color="green"
      />
      <!-- <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input> -->
    </template>
    <template v-slot:item="props">
      <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
        <q-card flat bordered class="q-ma-sm">
          <q-img
            :src="`/output/${encodeURIComponent(props.row.id)}/image.png`"
          />

          <q-card-section>
            <q-btn
              fab-mini
              color="secondary"
              icon="content_copy"
              class="absolute"
              style="top: 0; right: 46px; transform: translateY(-60%)"
              @click="store.copy_history(props.row)"
            />
            <q-btn
              fab-mini
              color="accent"
              icon="delete"
              class="absolute"
              @click="del(index)"
              style="top: 0; right: 0px; transform: translateY(-60%)"
            />
            <div class="text-h8">{{ props.row.id }}</div>
            <div class="text-weight-bold">{{ props.row.prompt }}</div>
            <div class="text-weight-bold text-red">
              {{ props.row.negative_prompt }}
            </div>
            <div class="text-caption">seed: {{ props.row.seed }}</div>
          </q-card-section>
        </q-card>
      </div>
    </template>
  </q-table>
</template>

<script>
import { useAibroStore } from "src/stores/aibro-store";
import { defineComponent, onMounted } from "vue";
import { useQuasar } from "quasar";
import { ref } from "vue";

const cols = [
  {
    name: "id",
    required: true,
    label: "#",
    align: "left",
    field: (row) => row.id,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "seed",
    required: true,
    label: "Seed",
    align: "left",
    field: (row) => row.seed,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "prompt",
    required: true,
    label: "Prompt",
    align: "left",
    field: (row) => row.prompt,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "negative_prompt",
    required: true,
    label: "Negative prompt",
    align: "left",
    field: (row) => row.negative_prompt,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "image",
    required: true,
    label: "Output image",
    align: "left",
    field: (row) => `/output/${encodeURIComponent(row.id)}/image.png`,
    format: (val) => `${val}`,
    sortable: false,
  },
];

export default defineComponent({
  name: "GalleryGrid",
  setup() {
    const store = useAibroStore();
    const $q = useQuasar();
    const grid_view = ref(false);
    const pagination = ref({
      sortBy: "id",
      descending: true,
      page: 0,
      rowsPerPage: 20,
      rowsNumber: 10,
    });
    const rows = ref([]);

    function onRequest(props) {
      console.log(props);
      store.loading_history = true;
      const { page, rowsPerPage, sortBy, descending } = props.pagination;
      const filter = props.filter;
      store
        .load_history(page, rowsPerPage, sortBy, descending)
        .then(({ data }) => {
          pagination.value.rowsNumber = data.count;
          rows.value = data.rows;
          pagination.value.page = page;
          pagination.value.rowsPerPage = rowsPerPage;
          pagination.value.sortBy = sortBy;
          pagination.value.descending = descending;
          store.loading_history = false;
        });
    }

    onMounted(() => {
      // store.reload_history();
      onRequest({ pagination: pagination.value });
    });
    return {
      pagination,
      rows,
      grid_view,
      store,
      cols,
      onRequest,
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

<style>
.aibro-gallery .q-table__grid-content.row {
  overflow-y: scroll;
}
</style>
