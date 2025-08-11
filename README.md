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

## MiniKube Test Deployment Guide

Follow the guide below to set up and test the application deployment using MiniKube with the Kubernetes configuration files defined in the `k8s-config/` directory.

---

### Prerequisites
- [Homebrew](https://brew.sh/) (for macOS users)
- [Docker](https://www.docker.com/) installed and running (if using Docker as the VM driver)
- `kubectl` installed (Kubernetes CLI)
---

### 1. Install MiniKube
If you haven't installed MiniKube yet, run:
```bash
brew install minikube
```

#### 2. Start Minikube
Start MiniKube using Docker as the hypervisor:
```bash
minikube start --vm-driver=docker
```

#### 3. Deploy Your Kubernetes Resources
```bash
kubectl apply -f ./secrets
kubectl apply -f ./services
kubectl apply -f ./deployments
kubectl apply -f frontend-deployment.yaml
```

#### 4. Access the Frontend Service
To open the frontend service in your browser, run:
```bash
minikube service frontend
```
This command will open the frontend service URL in your default web browser.

#### 5. Stop and Clean Up MiniKube
```bash
minikube stop
minikube delete
```