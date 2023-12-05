import { defineStore } from 'pinia';
import axios from "axios";
import { LocalStorage, SessionStorage } from 'quasar'
import { date } from "quasar";
import { Notify } from 'quasar'


export const useAibroStore = defineStore('aibro', {
  state: () => {
    let ret = {
      prompt: "Astronaut in a jungle, cold color palette, muted colors, detailed, 8k",
      negative_prompt: "",
      seed: Math.round(Math.random() * 100000),
      width: 1024,
      height: 1024,
      num_inference_steps: 50,
      guidance_scale: 5,
      guidance_rescale: 0,
      original_size_width: 1024,
      original_size_height: 1024,
      target_size_width: 1024,
      target_size_height: 1024,
      crops_coords_top_left_x: 0,
      crops_coords_top_left_y: 0,
    };

    for (const i in ret) {
      try {
        const v = LocalStorage.getItem("txt2img_" + i);
        if (v) {
          ret[i] = v;
        }
      } catch (e) {
        console.log(e)
      }
    }

    ret = {
      ...ret,
      since: undefined,
      history: [],
      loading: false,
      loading_history: false,
      output_image: LocalStorage.getItem("txt2img_output_image"),
      prompt_script: LocalStorage.getItem("txt2img_prompt_script") || ""
    }

    return ret;
  },
  actions: {
    del_history(i) {
      this.loading_history = true
      axios.delete(`/api/history/${encodeURIComponent(i.id)}`).then(({ data }) => {
        this.reload_history();
      })
    },
    load_history(page,rowsPerPage,sortBy,descending) {
      this.loading_history = true
      return axios.post("/api/history",{
        page,rowsPerPage,sortBy:sortBy || "id",descending
      });
    },
    reload_history() {
      this.loading_history = true
      axios.get("/api/history").then(({ data }) => {
        console.log(data)
        this.history = data.sort((a, b) => {
          return b.id.localeCompare(a.id);
        });
        this.loading_history = false
      });
    },
    copy_history(item) {
      this.loading = true;
      for (const i in item) {
        if (i in this) {
          this[i] = item[i];
        }
      }
      this.output_image = `/output/${encodeURIComponent(item.id)}/image.png`;
      this.loading = false;
    },
    txt2img_check(id, q) {
      axios
        .get(`/api/txt2img/${encodeURIComponent(id)}`)
        .then(({ data }) => {
          if (data.status) {
            this.since = `${date.getDateDiff(
              new Date(data.tick),
              new Date(id),
              "seconds"
            )} seconds...`;
            setTimeout(() => this.txt2img_check(id, q), 2000);
          } else {
            this.output_image = `/output/${encodeURIComponent(id)}/image.png`;
            LocalStorage.set("txt2img_output_image", `/output/${encodeURIComponent(id)}/image.png`);
            LocalStorage.set("job_id", undefined);
            this.reload_history();
            if (q.length == 0) {
              this.loading = false;
            } else {
              this.txt2img_runonserver(q);
            }
          }
        })
        .catch((err) => {
          Notify.create(`Error: ${err}`);
          LocalStorage.set("job_id", undefined);
          this.loading = false;
        });

    },
    txt2img_run() {
      this.loading = true;

      const data = {
        prompt: this.prompt,
        prompt_script: this.prompt_script,
        negative_prompt: this.negative_prompt,
        seed: this.seed,
        width: this.width,
        height: this.height,
        num_inference_steps: this.num_inference_steps,
        guidance_scale: this.guidance_scale,
        guidance_rescale: this.guidance_rescale,
        original_size_width: this.original_size_width,
        original_size_height: this.original_size_height,
        target_size_width: this.target_size_width,
        target_size_height: this.target_size_height,
        crops_coords_top_left_x: this.crops_coords_top_left_x,
        crops_coords_top_left_y: this.crops_coords_top_left_y,
      };

      let queue = [data];
      if (this.prompt_script.trim().length > 0) {
        try {
          const e = eval(this.prompt_script);
          queue = e(data);
        } catch (ex) {
          Notify.create(`Eval error: ${ex}`);
          this.loading = false;
          return
        }
      }


      for (const i of Object.keys(data)) {
        const k = i;
        const v = data[i]
        if (v) {
          try {
            LocalStorage.set("txt2img_" + k, v);
          } catch (e) {
            Notify.create(`Error save params: ${e}`);
            // console.log(`Error save params: ${e}`)
          }
        } else {
          LocalStorage.remove("txt2img_" + k);
        }
      }

      if (queue.length > 1) {
        axios
          .post("/api/txt2imgs", queue)
          .then(({ data }) => {
            LocalStorage.set("txt2img_job_id", data.id);
            this.txt2img_check(data.id, []);
          })
          .catch((err) => {
            Notify.create(`Error: ${err}`)
            //$q.notify(`Error: ${err}`);
            this.loading = false;
          });

      } else
        this.txt2img_runonserver(queue);
      // axios
      //   .post("/api/txt2img", queue.shift())
      //   .then(({ data }) => {
      //     LocalStorage.set("txt2img_job_id", data.id);
      //     this.txt2img_check(data.id, queue);
      //   })
      //   .catch((err) => {
      //     Notify.create(`Error: ${err}`)
      //     //$q.notify(`Error: ${err}`);
      //     this.loading = false;
      //   });

    },
    txt2img_runonserver(q) {
      const data = q.shift();
      axios
        .post("/api/txt2img", data)
        .then(({ data }) => {
          LocalStorage.set("txt2img_job_id", data.id);
          this.txt2img_check(data.id, q);
        })
        .catch((err) => {
          Notify.create(`Error: ${err}`)
          //$q.notify(`Error: ${err}`);
          this.loading = false;
        });

    }

  },
});
