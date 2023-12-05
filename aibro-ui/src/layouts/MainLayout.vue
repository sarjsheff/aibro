<template>
  <q-layout view="lHh Lpr fFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>AIBro</q-toolbar-title>
        <q-btn v-if="$route.path == '/'" dense flat round icon="menu" @click="toggleRightDrawer" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Menu </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>
    <q-drawer v-model="rightDrawerOpen" side="right" overlay bordered>
      <HistoryList></HistoryList>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";
import HistoryList from "src/components/HistoryList.vue";

const linksList = [
  {
    title: "txt2img",
    caption: "Text to image.",
    icon: "school",
    link: "/",
  },
  {
    title: "Gallery",
    caption: "Generations gallery.",
    icon: "school",
    link: "/gallery",
  },

  // {
  //   title: "img2img",
  //   caption: "Image to image.",
  //   icon: "school",
  //   link: "/img2img",
  // },
  // {
  //   title: "imgeditor",
  //   caption: "Edit images.",
  //   icon: "school",
  //   link: "/imgeditor",
  // },
];

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
    HistoryList,
  },

  setup() {
    const leftDrawerOpen = ref(false);
    const rightDrawerOpen = ref(false);

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      rightDrawerOpen,
      toggleRightDrawer() {
        rightDrawerOpen.value = !rightDrawerOpen.value;
      },
    };
  },
});
</script>
