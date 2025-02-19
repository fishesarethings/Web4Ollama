# **Ollama Chatbot - GitHub Pages Frontend & Local Processing**  

## **Overview**  
This is a simple chatbot interface for **Ollama**, designed to run as a **static frontend on GitHub Pages**.  
⚠️ **Important:** Since GitHub Pages **cannot run AI models**, the chatbot requires a **local Ollama server** for backend processing.  

## **How It Works**  
1. The frontend is deployed on GitHub Pages.  
2. The chatbot connects to a **locally running Ollama server** (`ollama serve`).  
3. Messages are sent to **http://127.0.0.1:11434**, and responses are generated by Ollama.  

## **Setup Instructions**  

### **1️⃣ Deploy Frontend on GitHub Pages**  
1. **Fork** this repository or create your own.  
2. Enable **GitHub Pages**:  
   - Go to **Settings → Pages**.  
   - Select **Branch: main** (or master).  
   - Click **Save**.  
3. Your chatbot will be available at:  
   **`https://your-username.github.io/ollama-chatbot/`**  

### **2️⃣ Install & Run Ollama Locally**  
#### **Install Ollama**  
- **Windows:** Download from [Ollama's Website](https://ollama.ai).  
- **Linux/macOS:** Run:  
  ```sh
  curl -fsSL https://ollama.ai/install.sh | sh
