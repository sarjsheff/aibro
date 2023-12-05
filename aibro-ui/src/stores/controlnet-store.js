import { defineStore } from 'pinia';
import { LocalStorage } from 'quasar'

export const useControlnetStore = defineStore('controlnet', {
  state: () => {
    let ret = {
      prompt: "",
      input_image: ""
    }
    for (const i in ret) {
      try {
        const v = LocalStorage.getItem("controlnet_" + i);
        if (v) {
          ret[i] = v;
        }
      } catch (e) {
        console.log(e)
      }
    }

    return {
      ...ret,
      since: undefined,
      history: [],
      loading: false,
      loading_history: false,
      output_image: LocalStorage.getItem("controlnet_output_image"),
      prompt_script: LocalStorage.getItem("controlnet_prompt_script") || ""
    }
  },
  actions: {
    from_output(o) {
      console.log(o.id)
      this.input_image = `/output/${encodeURIComponent(o.id)}/image.png`;
      LocalStorage.set("controlnet_input_image",this.input_image)
    },
  },
});
