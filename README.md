# AIBro


<p align="center">
    <img width="400" align="center" src="https://raw.githubusercontent.com/sarjsheff/aibro/master/pics/logo.png">
</p>


My ML tool.

- [x] StableDiffusion XL txt2img generator
- [x] Prompt script
- [x] Gallery

Run:

```
pip install -r requirements.txt
uvicorn aibro:Api --host 0.0.0.0 --port 7002 --workers 1
```

Docker run:

```
docker run -it --rm --gpus=all -v $(pwd)/output:/app/output -p 8002:8002 r.sheff.online/library/aibro
```

![screen1](./pics/screen.png)

![screen1](./pics/screen1.png)

![screen2](./pics/screen2.png)

![screen3](./pics/screen3.png)