<template>
  <q-page style="height: 300px" >
      <GalleryGrid class="fit flex" style="flex: 1;"></GalleryGrid>
  </q-page>
</template>

<script>
import GalleryGrid from "src/components/GalleryGrid.vue";
import { defineComponent } from "vue";

export default defineComponent({
    name: "GalleryPage",
    components: { GalleryGrid }
});
</script>
