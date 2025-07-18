import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from huggingface_hub import InferenceClient
# from transformers import pipeline


app = Flask(__name__)
CORS(app)

# ********************* Ask Mistral *********************
load_dotenv()
access_token = os.getenv('HF_ACCESS_TOKEN')
SYSTEM_PROMPT = (
    "You are an assistant that receives a list of ingredients that a user has and "
    "suggests a recipe they could make with some or all of those ingredients. "
    "You don't need to use every ingredient they mention in your recipe. "
    "The recipe can include additional ingredients they didn't mention, "
    "but try not to include too many extra ingredients. "
    "Format your response in markdown to make it easier to render to a web page."
)
@app.route('/getMistralRecipe', methods=['POST'])
def generate_text():
    data = request.get_json()
    prompt = data.get('prompt', '')

    client = InferenceClient(token=access_token)
    messages = [
        {"role": "system", "content": SYSTEM_PROMPT},
        {"role": "user", "content": prompt}
    ]
    response = client.chat_completion(
        model="mistralai/Mixtral-8x7B-Instruct-v0.1",
        messages=messages,
        max_tokens=1024
    )
    return jsonify({"response": response.choices[0].message.content})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)


# pipe = pipeline("text-generation", model="openai-community/gpt2")
# @app.route('/getRecipe', methods=['POST'])
# def generate_text():
#     data = request.get_json()
#     prompt = data.get('prompt', '')     # get 'prompt' key, else default to ''

#     result = pipe(prompt, max_length=100, num_return_sequences=1)
#     return jsonify({"response": result[0]['generated_text']})