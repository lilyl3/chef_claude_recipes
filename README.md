# 👨‍🍳 Chef Claude

**Chef Claude** is an AI recipe generator that turns your ingredients into recipes using a large language model (LLM).

## 🚀 Getting Started

### 1. Set Up Hugging Face Access
- Sign up at [Hugging Face](https://huggingface.co).
- Create an access token with **"Make calls to Inference API"** permission.
- Create a `.env` file in the `./backend` directory with the following content:
    ```env
    HF_ACCESS_TOKEN=your_token_here
    ```
### 2. Run the App
- Use Docker Compose to build and start the application:
    ```bash
    docker-compose -f compose.yml up --build
    ```

## 📋 Requirements
1. Docker + Docker Compose
2. Hugging Face account with access token


## 🏗️ Architecture

- **Frontend**: A React app that lets users input ingredients and displays AI-generated recipes.
- **Backend**: A Python Flask API that queries Mistral (LLM) to generate recipes based on the input.

**Note**: This project extends a Scrimba tutorial by running the application with Docker instead of calling the LLM directly via JavaScript.
