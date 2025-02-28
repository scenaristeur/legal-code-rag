# https://docs.llamaindex.ai/en/stable/examples/llm/ollama/
from llama_index.llms.ollama import Ollama
llm = Ollama(model="llama3.2:latest", request_timeout=120.0)
resp = llm.complete("Qui est Paul Graham?")
print(resp)