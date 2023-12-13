import fire, uvicorn, random
import llama_cpp
from typing import Union, Optional, List
from pydantic import BaseModel
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


class SaigaLLM:
    def __init__(
        self,
        model_path="saiga2_7b-q8_K.gguf",
        n_ctx=2000,
        system_prompt="Ты — Сайга, русскоязычный автоматический ассистент. Ты разговариваешь с людьми и помогаешь им.",
        seed=llama_cpp.LLAMA_DEFAULT_SEED,
        n_parts=1,
    ) -> None:
        self.SYSTEM_PROMPT = system_prompt
        self.SYSTEM_TOKEN = 1587
        self.USER_TOKEN = 2188
        self.BOT_TOKEN = 12435
        self.LINEBREAK_TOKEN = 13

        self.ROLE_TOKENS = {
            "user": self.USER_TOKEN,
            "bot": self.BOT_TOKEN,
            "system": self.SYSTEM_TOKEN,
        }

        self.model = llama_cpp.Llama(
            model_path=model_path, n_ctx=n_ctx, n_parts=n_parts, seed=seed
        )

    def get_message_tokens(self, role, content):
        message_tokens = self.model.tokenize(content.encode("utf-8"))
        message_tokens.insert(1, self.ROLE_TOKENS[role])
        message_tokens.insert(2, self.LINEBREAK_TOKEN)
        message_tokens.append(self.model.token_eos())
        return message_tokens

    def get_system_tokens(self):
        system_message = {"role": "system", "content": self.SYSTEM_PROMPT}
        return self.get_message_tokens(**system_message)

    def invoke(self, r):
        system_tokens = self.get_system_tokens()
        tokens = system_tokens

        if "history" in r:
            for h in r["history"]:
                mt = self.get_message_tokens(role=h["role"], content=h["message"])
                tokens += mt

        message_tokens = self.get_message_tokens(role="user", content=r["input"])
        role_tokens = [self.model.token_bos(), self.BOT_TOKEN, self.LINEBREAK_TOKEN]
        tokens += message_tokens + role_tokens
        print(tokens)
        full_prompt = self.model.detokenize(tokens).decode("utf-8", errors="ignore")
        print(full_prompt)

        generator = self.model.generate(
            tokens,
            top_k=r.get("top_k", 30),
            top_p=r.get("top_p", 0.9),
            temp=r.get("temperature", 0.2),
            repeat_penalty=r.get("repeat_penalty", 1.1),
        )
        ret: str = ""
        for token in generator:
            token_str = self.model.detokenize([token]).decode("utf-8", errors="ignore")
            tokens.append(token)
            if token == self.model.token_eos():
                break
            print(token_str, end="", flush=True)
            ret += token_str
        return ret


def SaigaServer(
    model_path="saiga2_7b-q8_K.gguf",
    n_ctx=2000,
    system_prompt="Ты — Сайга, русскоязычный автоматический ассистент. Ты разговариваешь с людьми и помогаешь им.",
    host="0.0.0.0",
    port=8012,
    seed=llama_cpp.LLAMA_DEFAULT_SEED,
):
    app = FastAPI()
    origins = ["*"]

    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    SYSTEM_PROMPT = system_prompt
    SYSTEM_TOKEN = 1587
    USER_TOKEN = 2188
    BOT_TOKEN = 12435
    LINEBREAK_TOKEN = 13

    ROLE_TOKENS = {"user": USER_TOKEN, "bot": BOT_TOKEN, "system": SYSTEM_TOKEN}

    def get_message_tokens(model, role, content):
        message_tokens = model.tokenize(content.encode("utf-8"))
        message_tokens.insert(1, ROLE_TOKENS[role])
        message_tokens.insert(2, LINEBREAK_TOKEN)
        message_tokens.append(model.token_eos())
        return message_tokens

    def get_system_tokens(model):
        system_message = {"role": "system", "content": SYSTEM_PROMPT}
        return get_message_tokens(model, **system_message)

    model = llama_cpp.Llama(model_path=model_path, n_ctx=n_ctx, n_parts=1, seed=seed)

    class ChatMessage(BaseModel):
        role: str = "bot"
        message: str = ""

    class Txt2TxtRequest(BaseModel):
        history: Optional[List[ChatMessage]]
        prompt: str
        n_ctx: Optional[int] = 2000
        top_k: Optional[int] = 30
        top_p: Optional[float] = 0.9
        temperature: Optional[float] = 0.2
        repeat_penalty: Optional[float] = 1.1

    @app.post("/api/txt2txt/prompt_sync_wo_memory")
    def prompt_sync_wo_memory(r: Txt2TxtRequest):
        system_tokens = get_system_tokens(model)
        tokens = system_tokens
        # model.eval(tokens)

        if r.history is not None:
            for h in r.history:
                mt = get_message_tokens(model=model, role=h.role, content=h.message)
                tokens += mt

        message_tokens = get_message_tokens(model=model, role="user", content=r.prompt)
        role_tokens = [model.token_bos(), BOT_TOKEN, LINEBREAK_TOKEN]
        tokens += message_tokens + role_tokens
        print(tokens)
        full_prompt = model.detokenize(tokens).decode("utf-8", errors="ignore")
        print(full_prompt)
        generator = model.generate(
            tokens,
            top_k=r.top_k,
            top_p=r.top_p,
            temp=r.temperature,
            repeat_penalty=r.repeat_penalty,
        )
        ret: str = ""
        for token in generator:
            token_str = model.detokenize([token]).decode("utf-8", errors="ignore")
            tokens.append(token)
            if token == model.token_eos():
                break
            print(token_str, end="", flush=True)
            ret += token_str

        return {"bot": ret}

    uvicorn.run(app, host=host, port=port)


if __name__ == "__main__":
    fire.Fire()
