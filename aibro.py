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

    pipeline = StableDiffusionXLPipeline.from_pretrained(
        "stabilityai/stable-diffusion-xl-base-1.0",
        torch_dtype=torch.float16,
        variant="fp16",
        use_safetensors=True,
    )
    pipeline.to("cuda")

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
                ).images[0].save(f"{output_dir}/{idd}/image.png")

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
    async def index():
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

    @app.delete("/api/history/{id}")
    async def history_del(id: str):
        shutil.rmtree(f"{output_dir}/{id}")
        return {"status": True}

    @app.get("/api/txt2img/{id}")
    async def txt2img(id: str):
        return {"status": id in jobs, "tick": datetime.datetime.now().isoformat()}

    @app.post("/api/txt2img")
    async def txt2img(item: Txt2imgRequest, background_tasks: BackgroundTasks):
        id = datetime.datetime.now().isoformat()  # uuid.uuid4()
        os.mkdir(f"{output_dir}/{id}")
        with open(f"{output_dir}/{id}/data.json", "w") as f:
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
