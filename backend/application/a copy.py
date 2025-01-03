from langchain_openai import OpenAI
from langchain.prompts import PromptTemplate
import os
from dotenv import load_dotenv
load_dotenv()


llm = OpenAI(
    openai_api_key=os.environ["OPENAI_API_KEY"],
    openai_organization=os.environ["OPENAI_ORGANIZATION"]
)

template = """
You are an AI assistant with expertise in data analysis and automation. Answer the following question:
Question: {question}
"""


prompt = PromptTemplate(template=template, input_variables=["question"])

chain = prompt | llm

query = "What is the impact of AI in healthcare?"

response = chain.invoke({"question": query})
print(f"Agent Response: {response}")
