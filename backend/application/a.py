from openai import OpenAI
import os
from dotenv import load_dotenv
load_dotenv()


client = OpenAI(
    openai_api_key=os.environ["OPENAI_API_KEY"],
    openai_organization=os.environ["OPENAI_ORGANIZATION"]
)


resp = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {"role": "developer", "content": "You are a helpful assistant."},
        {
            "role": "user",
            "content": "Write a haiku about recursion in programming."
        }
    ]
)

print(resp.choices[0].message)
