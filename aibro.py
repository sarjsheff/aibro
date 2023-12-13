from fastapi import FastAPI, BackgroundTasks, Response
from pydantic import BaseModel
import uuid, os, json, shutil
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
import datetime
from diffusers import (
    StableDiffusionXLPipeline,
    StableDiffusionXLImg2ImgPipeline,
    AutoPipelineForImage2Image,
    StableDiffusionXLControlNetPipeline,
    ControlNetModel,
    AutoencoderKL,
)
from diffusers.utils import load_image, make_image_grid
import torch
import queue
import duckdb
from typing import Union, Optional
import numpy as np
import cv2
from PIL import Image
import subprocess, threading, fire, uvicorn
import httpx


class ServerProc:
    def __init__(self, cmd):
        self.cmd = cmd
        self._p = None
        self.is_work = False
        self._ret = None
        self.thread = threading.Thread(target=self._run)
        self._stopped = True

    def _run(self):
        self._ret = None
        self._p = subprocess.Popen(self.cmd)
        self.is_work = True
        while self.is_work:
            try:
                self._ret = self._p.wait(1)
                print(f"Process finish ({self._ret}).")
                if self._stopped:
                    self.is_work = False
                    print("Stop.")
                else:
                    print("Restart.")
                    self._p = subprocess.Popen(self.cmd)
            except:
                pass
                # print("work")

    def stop(self):
        self._stopped = True
        if self._p is not None and self._p.poll() is None:
            self._p.kill()

    def start(self):
        self._stopped = False
        self.thread = threading.Thread(target=self._run)
        self.thread.start()

    def is_alive(self):
        if self.thread.is_alive:
            if self._p is not None and self._p.poll() is None:
                return True
        return False


class ComplexRequest(BaseModel):
    prompt: str = ""
    negative_prompt: str = ""
    seed: int = 0
    width: int = 1024
    height: int = 1024
    num_inference_steps: int = 50
    guidance_scale: float = 5.0
    guidance_rescale: float = 0.0
    original_size_width: int = 1024
    original_size_height: int = 1024
    target_size_width: int = 1024
    target_size_height: int = 1024
    crops_coords_top_left_x: int = 0
    crops_coords_top_left_y: int = 0
    prompt_script: str = ""
    job_type: int = 0  # 0 - txt2img, 1 - controlnet
    input_image: Optional[str] = None
    controlnet_conditioning_scale: float = 0.5


class HistoryRequest(BaseModel):
    page: int
    rowsPerPage: int
    sortBy: str
    descending: bool


class Txt2Img:
    def __init__(self):
        self._pipeline = StableDiffusionXLPipeline.from_pretrained(
            "stabilityai/stable-diffusion-xl-base-1.0",
            torch_dtype=torch.float16,
            variant="fp16",
            use_safetensors=True,
        )
        if torch.cuda.device_count() > 0:
            self._pipeline.to("cuda")
        elif torch.backends.mps.is_available():
            self._pipeline.to("mps")

    def pipeline(self, **kwargs):
        return self._pipeline(**kwargs)


class ControlNet:
    def __init__(self):
        # initialize the models and pipeline for ControlnNet
        self.controlnet_conditioning_scale = 0.5  # recommended for good generalization
        self.controlnet = ControlNetModel.from_pretrained(
            "diffusers/controlnet-canny-sdxl-1.0", torch_dtype=torch.float16
        )
        self.vae = AutoencoderKL.from_pretrained(
            "madebyollin/sdxl-vae-fp16-fix", torch_dtype=torch.float16
        )
        self.pipeline = StableDiffusionXLControlNetPipeline.from_pretrained(
            "stabilityai/stable-diffusion-xl-base-1.0",
            controlnet=self.controlnet,
            vae=self.vae,
            torch_dtype=torch.float16,
        )
        self.pipeline.enable_model_cpu_offload()

# def Txt2TxtServer(output_dir="./output", host="0.0.0.0", port=8012):
#     app = FastAPI()
#     origins = ["*"]
#     app.add_middleware(
#         CORSMiddleware,
#         allow_origins=origins,
#         allow_credentials=True,
#         allow_methods=["*"],
#         allow_headers=["*"],
#     )
#     # Load model directly
#     from transformers import AutoTokenizer, AutoModelForCausalLM
#     tokenizer = AutoTokenizer.from_pretrained("ai-forever/mGPT")
#     model = AutoModelForCausalLM.from_pretrained("ai-forever/mGPT")
#     @app.get("/api/txt2txt/test")
#     async def txt2txt_test():
#         request = "Стих про программиста может быть таким:"
#         encoded_input = tokenizer(request, return_tensors='pt', add_special_tokens=False).to('cuda:0')
#         output = model.generate(
#             **encoded_input,
#             num_beams=2,
#             do_sample=True,
#             max_new_tokens=100
#         )
#         return {"result":tokenizer.decode(output[0], skip_special_tokens=True)}


def Txt2ImgServer(output_dir="./output", host="0.0.0.0", port=8011):
    jobs = {}
    q = queue.Queue(maxsize=1)
    app = FastAPI()
    origins = ["*"]

    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    txt2img = Txt2Img()
    control_net = ControlNet()

    def gen_controlnet(id: str):
        q.put(id)
        items = jobs[id]
        if type(items) == list:
            for item in items:
                idd = datetime.datetime.now().isoformat()
                os.mkdir(f"{output_dir}/{idd}")
                with open(f"{output_dir}/{idd}/data.json", "w") as f:
                    f.write(item.json())

                g = torch.manual_seed(int(item.seed))

                image = load_image(item.input_image)

                # get canny image
                image = np.array(image)
                image = cv2.Canny(image, 100, 200)
                image = image[:, :, None]
                image = np.concatenate([image, image, image], axis=2)
                canny_image = Image.fromarray(image)
                canny_image.save(f"{output_dir}/{idd}/image_canny.png")

                control_net.pipeline(
                    generator=g,
                    prompt=item.prompt,
                    negative_prompt=item.negative_prompt,
                    width=item.width,
                    height=item.height,
                    num_inference_steps=item.num_inference_steps,
                    guidance_scale=item.guidance_scale,
                    guidance_rescale=item.guidance_rescale,
                    original_size=(item.original_size_width, item.original_size_height),
                    target_size=(item.target_size_width, item.target_size_height),
                    crops_coords_top_left=(
                        item.crops_coords_top_left_x,
                        item.crops_coords_top_left_y,
                    ),
                    controlnet_conditioning_scale=item.controlnet_conditioning_scale,
                    image=canny_image,
                ).images[0].save(f"{output_dir}/{idd}/image.png")
            del jobs[id]
            q.get()
        else:
            item = items
            g = torch.manual_seed(int(item.seed))

            image = load_image(item.input_image)

            # get canny image
            image = np.array(image)
            image = cv2.Canny(image, 100, 200)
            image = image[:, :, None]
            image = np.concatenate([image, image, image], axis=2)
            canny_image = Image.fromarray(image)
            canny_image.save(f"{output_dir}/{id}/image_canny.png")

            control_net.pipeline(
                generator=g,
                prompt=item.prompt,
                negative_prompt=item.negative_prompt,
                width=item.width,
                height=item.height,
                num_inference_steps=item.num_inference_steps,
                guidance_scale=item.guidance_scale,
                guidance_rescale=item.guidance_rescale,
                original_size=(item.original_size_width, item.original_size_height),
                target_size=(item.target_size_width, item.target_size_height),
                crops_coords_top_left=(
                    item.crops_coords_top_left_x,
                    item.crops_coords_top_left_y,
                ),
                controlnet_conditioning_scale=item.controlnet_conditioning_scale,
                image=canny_image,
            ).images[0].save(f"{output_dir}/{id}/image.png")

            del jobs[id]
            q.get()

    def gen(id: str):
        q.put(id)
        items = jobs[id]
        if type(items) == list:
            print("list")
            for item in items:
                # with open(f"./output/{id}/data.json", "w") as f:
                #     f.write(item.json())
                idd = datetime.datetime.now().isoformat()
                os.mkdir(f"{output_dir}/{idd}")
                with open(f"{output_dir}/{idd}/data.json", "w") as f:
                    f.write(item.json())

                g = torch.manual_seed(int(item.seed))
                txt2img.pipeline(
                    generator=g,
                    prompt=item.prompt,
                    negative_prompt=item.negative_prompt,
                    width=item.width,
                    height=item.height,
                    num_inference_steps=item.num_inference_steps,
                    guidance_scale=item.guidance_scale,
                    guidance_rescale=item.guidance_rescale,
                    original_size=(item.original_size_width, item.original_size_height),
                    target_size=(item.target_size_width, item.target_size_height),
                    crops_coords_top_left=(
                        item.crops_coords_top_left_x,
                        item.crops_coords_top_left_y,
                    ),
                ).images[0].save(f"{output_dir}/{idd}/image.png")

            del jobs[id]
            q.get()
        else:
            item = items
            g = torch.manual_seed(int(item.seed))

            print(txt2img)
            txt2img.pipeline(
                generator=g,
                prompt=item.prompt,
                negative_prompt=item.negative_prompt,
                width=item.width,
                height=item.height,
                num_inference_steps=item.num_inference_steps,
                guidance_scale=item.guidance_scale,
                guidance_rescale=item.guidance_rescale,
                original_size=(item.original_size_width, item.original_size_height),
                target_size=(item.target_size_width, item.target_size_height),
                crops_coords_top_left=(
                    item.crops_coords_top_left_x,
                    item.crops_coords_top_left_y,
                ),
            ).images[0].save(f"{output_dir}/{id}/image.png")
            del jobs[id]
            q.get()

    @app.get("/api/txt2img/{id}")
    async def txt2img_get(id: str):
        return {"status": id in jobs, "tick": datetime.datetime.now().isoformat()}

    @app.post("/api/txt2img")
    async def txt2img_post(item: ComplexRequest, background_tasks: BackgroundTasks):
        id = datetime.datetime.now().isoformat()  # uuid.uuid4()
        os.mkdir(f"{output_dir}/{id}")
        with open(f"{output_dir}/{id}/data.json", "w") as f:
            f.write(item.json())
        jobs[id] = item
        if item.job_type == 1:
            background_tasks.add_task(gen_controlnet, id)
        else:
            background_tasks.add_task(gen, id)

        return {"id": id}

    @app.post("/api/txt2imgs")
    async def txt2imgs(item: list[ComplexRequest], background_tasks: BackgroundTasks):
        id = datetime.datetime.now().isoformat()  # uuid.uuid4()
        jobs[id] = item
        if item[0].job_type == 1:
            background_tasks.add_task(gen_controlnet, id)
        else:
            background_tasks.add_task(gen, id)

        return {"id": id}

    @app.post("/api/controlnet")
    async def control_net_post(item: ComplexRequest, background_tasks: BackgroundTasks):
        id = datetime.datetime.now().isoformat()  # uuid.uuid4()
        item.job_type = 1
        os.mkdir(f"{output_dir}/{id}")
        with open(f"{output_dir}/{id}/data.json", "w") as f:
            f.write(item.json())
        jobs[id] = item
        background_tasks.add_task(gen_controlnet, id)

        return {"id": id}

    uvicorn.run(app, host=host, port=port)


def Api(output_dir="./output", host="0.0.0.0", port=8002):
    if not os.path.isdir(output_dir):
        os.mkdir(output_dir)
    app = FastAPI()
    app.mount("/output", StaticFiles(directory=output_dir), name="output")
    app.mount("/assets", StaticFiles(directory="./app/assets"), name="spa_assets")
    app.mount("/icons", StaticFiles(directory="./app/icons"), name="spa_icons")

    origins = ["*"]

    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    procs = {
        "txt2img": {
            "proc": ServerProc(
                [
                    "python3",
                    "aibro.py",
                    "Txt2ImgServer",
                    "--output_dir",
                    output_dir,
                    "--host",
                    host,
                ]
            ),
            "public_port": 8011,
        },
        "txt2txt": {
            "proc": ServerProc(
                [
                    "python3",
                    "aibro_saiga2.py",
                    "SaigaServer",
                    "--host",
                    host,
                    "--port",
                    "8012"
                ]
            ),
            "public_port": 8012,
        }
        # "llm":ServerProc(["python3", "test.py", "TwoServer"])
    }

    @app.get("/")
    async def index():
        content = ""
        with open("./app/index.html") as f:
            content = f.read()
        return HTMLResponse(content)

    @app.get("/favicon.ico")
    async def favicon():
        content = ""
        with open("./app/favicon.ico","rb") as f:
            content = f.read()
        return Response(content, media_type="image/x-icon")

    @app.get("/api/history")
    async def history():
        ret = []
        try:
            d = duckdb.sql(
                f"SELECT *,string_split(filename,'/')[3] as id FROM read_json_auto('{output_dir}/*/data.json',filename=true) order by id desc limit 100"
            )
            for i in d.fetchall():
                itm = {}
                for idx, ii in enumerate(i):
                    itm[d.columns[idx]] = ii
                ret.append(itm)
        except Exception as ex:
            print(ex)
        return ret

    @app.post("/api/history")
    async def history_post(r: HistoryRequest):
        ret = {"count": 0, "rows": []}
        try:
            orderby = " id desc "
            if r.sortBy is not None and r.sortBy != "":
                orderby = f" {r.sortBy} {'desc' if r.descending else 'asc'} "
            d = duckdb.sql(
                f"SELECT *,string_split(filename,'/')[3] as id FROM read_json_auto('{output_dir}/*/data.json',filename=true) order by {orderby} offset {r.rowsPerPage*(r.page-1) if r.page > 0 else 0} limit {r.rowsPerPage}"
            )
            for i in d.fetchall():
                itm = {}
                for idx, ii in enumerate(i):
                    itm[d.columns[idx]] = ii
                ret["rows"].append(itm)
            ret["count"] = duckdb.sql(
                f"SELECT count() FROM read_json_auto('{output_dir}/*/data.json',filename=true)"
            ).fetchone()[0]
        except Exception as ex:
            print(ex)
        return ret

    @app.delete("/api/history/{id}")
    async def history_del(id: str):
        shutil.rmtree(f"{output_dir}/{id}")
        return {"status": True}

    @app.get("/api/proc")
    def proc_status():
        ret = {}
        for k in procs.keys():
            ret[k] = {"is_alive": procs[k]["proc"].is_alive(),"port":procs[k]["public_port"]}
        return ret

    @app.get("/api/proc/start/{name}")
    def proc_start_one(name: str):
        if name in procs:
            if procs[name]["proc"].is_alive() is False:
                procs[name]["proc"].start()
            return {"status": "started"}
        else:
            return {"status": "notfound"}

    @app.get("/api/proc/stop/{name}")
    def proc_stop_one(name: str):
        if name in procs:
            if procs[name]["proc"].is_alive() and procs[name]["proc"]._stopped == False:
                procs[name]["proc"].stop()
            return {"status": "stopped"}
        else:
            return {"status": "notfound"}

    uvicorn.run(app, host=host, port=port)

if __name__ == "__main__":
    fire.Fire()
