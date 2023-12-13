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
        <q-btn
          v-if="$route.path == '/txt2img'"
          dense
          flat
          round
          icon="menu"
          @click="toggleRightDrawer"
        />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Menu </q-item-label>
        <template v-for="link in essentialLinks" :key="link.title">
          <EssentialLink v-bind="link" v-if="check(link)" />
        </template>
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
import { useAibroStore } from "src/stores/aibro-store";

const linksList = [
  {
    title: "Services",
    caption: "Manage services.",
    icon: "school",
    link: "/",
  },
  {
    title: "Gallery",
    caption: "Generations gallery.",
    icon: "school",
    link: "/gallery",
  },
  {
    title: "Txt2img",
    caption: "Text to image.",
    icon: "school",
    link: "/proc_txt2img",
  },
  {
    title: "Txt2Txt",
    caption: "Text generation.",
    icon: "school",
    link: "/proc_txt2txt",
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
    const store = useAibroStore();

    return {
      store,
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      rightDrawerOpen,
      toggleRightDrawer() {
        rightDrawerOpen.value = !rightDrawerOpen.value;
      },
      check(link) {
        if (link.link.indexOf("/proc_") == 0) {
          return store.procs[link.link.split("_")[1]]?.is_alive == true;
        } else {
          return true;
        }
      },
    };
  },
});
</script>
