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

RUN python3 -c 'import torch;from diffusers import StableDiffusionXLControlNetPipeline, ControlNetModel, AutoencoderKL;controlnet = ControlNetModel.from_pretrained("diffusers/controlnet-canny-sdxl-1.0", torch_dtype=torch.float16);vae = AutoencoderKL.from_pretrained("madebyollin/sdxl-vae-fp16-fix", torch_dtype=torch.float16);pipe = StableDiffusionXLControlNetPipeline.from_pretrained("stabilityai/stable-diffusion-xl-base-1.0", controlnet=controlnet, vae=vae, torch_dtype=torch.float16)'

RUN pip3 install httpx

RUN python3 -c 'from transformers import AutoTokenizer, AutoModelForCausalLM;tokenizer = AutoTokenizer.from_pretrained("ai-forever/mGPT");model = AutoModelForCausalLM.from_pretrained("ai-forever/mGPT")'

RUN wget -o /app/saiga2_7b-q8_K.gguf https://huggingface.co/IlyaGusev/saiga2_7b_gguf/resolve/main/model-q4_K.gguf

RUN wget -o /app/saiga2_mistral-7b-q8_K.gguf https://huggingface.co/IlyaGusev/saiga_mistral_7b_gguf/resolve/main/model-q4_K.gguf

RUN pip3 install llama-cpp-python
RUN pip install pydantic==1.10.13

COPY . /app/

#CMD ["uvicorn","aibro:Api","--host", "0.0.0.0", "--port", "8002", "--workers", "1"]
CMD ["python3","aibro.py","Api","--host", "0.0.0.0", "--port", "8002"]