FROM nvidia/cuda:12.3.0-devel-ubuntu22.04

ARG DEBIAN_FRONTEND=noninteractive
ENV TZ=Etc/UTC


RUN apt update && apt install -y python3.10-full git micro
RUN apt install -y python3-pip
RUN apt install -y libgl1-mesa-glx libglib2.0-0

WORKDIR /app

COPY requirements.txt /app/

RUN pip install -r requirements.txt

RUN python3 -c 'from diffusers import StableDiffusionXLPipeline;StableDiffusionXLPipeline.from_pretrained("stabilityai/stable-diffusion-xl-base-1.0")'

RUN python3 -c 'import torch;from diffusers import StableDiffusionXLPipeline;StableDiffusionXLPipeline.from_pretrained("stabilityai/stable-diffusion-xl-base-1.0",torch_dtype=torch.float16,variant="fp16",use_safetensors=True)'

COPY . /app/

CMD ["uvicorn","aibro:Api","--host", "0.0.0.0", "--port", "8002", "--workers", "1"]
