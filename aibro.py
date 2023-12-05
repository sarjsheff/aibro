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
from typing import Union,Optional
import numpy as np
import cv2
from PIL import Image


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
        self._pipeline.to("cuda")

    def pipeline(self,**kwargs):
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


def Api(output_dir="./output"):
    if not os.path.isdir(output_dir):
        os.mkdir(output_dir)
    jobs = {}
    q = queue.Queue(maxsize=1)
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

    txt2img = Txt2Img()
    print(txt2img)
    control_net = ControlNet()

    def gen_controlnet(id: str):
        q.put(id)
        items = jobs[id]
        if type(items) == list:
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

    @app.get("/")
    async def index():
        content = ""
        with open("./app/index.html") as f:
            content = f.read()
        return HTMLResponse(content)

    @app.get("/favicon.ico")
    async def favicon():
        content = ""
        with open("./app/favicon.ico") as f:
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

    return app


if __name__ == "__main__":
    fire.Fire(Api)
