from fastapi import FastAPI, BackgroundTasks
from pydantic import BaseModel
import uuid, os, json, shutil
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
import datetime
from diffusers import (
    StableDiffusionXLPipeline,
    StableDiffusionXLImg2ImgPipeline,
    AutoPipelineForImage2Image,
)
from diffusers.utils import load_image, make_image_grid
import torch
import queue
import duckdb

class Txt2imgRequest(BaseModel):
    prompt: str
    negative_prompt: str
    seed: int
    width: int
    height: int
    num_inference_steps: int
    guidance_scale: float
    guidance_rescale: float
    original_size_width: int
    original_size_height: int
    target_size_width: int
    target_size_height: int
    crops_coords_top_left_x: int
    crops_coords_top_left_y: int
    prompt_script: str


def Api():

    jobs = {}
    q = queue.Queue(maxsize=1)
    app = FastAPI()
    app.mount("/output", StaticFiles(directory="output"), name="output")
    # app.mount("/", StaticFiles(directory="spa"), name="spa")
    origins = ["*"]

    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    pipeline = StableDiffusionXLPipeline.from_pretrained(
        "stabilityai/stable-diffusion-xl-base-1.0",
        torch_dtype=torch.float16,
        variant="fp16",
        use_safetensors=True,
    ).to("cuda")

    def gen(id: str):
        q.put(id)
        items = jobs[id]
        if type(items) == list:
            print("list")
            for item in items:
                # with open(f"./output/{id}/data.json", "w") as f:
                #     f.write(item.json())
                idd = datetime.datetime.now().isoformat()
                os.mkdir(f"./output/{idd}")
                with open(f"./output/{idd}/data.json", "w") as f:
                    f.write(item.json())
                
                g = torch.manual_seed(int(item.seed))
                pipeline(
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
                ).images[0].save(f"./output/{idd}/image.png")

            del jobs[id]
            q.get()
        else:
            item = items
            g = torch.manual_seed(int(item.seed))

            pipeline(
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
            ).images[0].save(f"./output/{id}/image.png")
            del jobs[id]
            q.get()

    @app.get("/api/history")
    async def history():
        ret = []
        d = duckdb.sql("SELECT *,string_split(filename,'/')[3] as id FROM read_json_auto('./output/*/data.json',filename=true) order by id desc limit 100")
        for i in d.fetchall():
            itm = {}
            for idx,ii in enumerate(i):
                itm[d.columns[idx]] = ii
            ret.append(itm)
        return ret

    @app.delete("/api/history/{id}")
    async def history_del(id: str):
        shutil.rmtree(f"./output/{id}")
        return {"status":True}


    @app.get("/api/txt2img/{id}")
    async def txt2img(id: str):
        return {"status": id in jobs,"tick":datetime.datetime.now().isoformat()}

    @app.post("/api/txt2img")
    async def txt2img(item: Txt2imgRequest, background_tasks: BackgroundTasks):
        id = datetime.datetime.now().isoformat()  # uuid.uuid4()
        os.mkdir(f"./output/{id}")
        with open(f"./output/{id}/data.json", "w") as f:
            f.write(item.json())
        jobs[id] = item
        background_tasks.add_task(gen, id)

        return {"id": id}

    @app.post("/api/txt2imgs")
    async def txt2img(item: list[Txt2imgRequest], background_tasks: BackgroundTasks):
        id = datetime.datetime.now().isoformat()  # uuid.uuid4()
        jobs[id] = item
        background_tasks.add_task(gen, id)

        return {"id": id}


    return app


if __name__ == "__main__":
    fire.Fire(Api)
