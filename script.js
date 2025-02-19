// Handle Login
document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("loginForm")) {
        document.getElementById("loginForm").addEventListener("submit", function (event) {
            event.preventDefault();
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            if (!email || !password) {
                document.getElementById("message").textContent = "Please fill in both fields.";
                return;
            }
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("userName", email.split("@")[0]);
            window.location.href = "main.html";
        });
    }

    if (document.getElementById("userName")) {
        const userName = localStorage.getItem("userName");
        if (!userName) {
            window.location.href = "index.html";
        } else {
            document.getElementById("userName").textContent = userName;
        }
    }
});

// GitHub Login
function loginWithGitHub() {
    const clientId = "YOUR_GITHUB_CLIENT_ID";
    const redirectUri = encodeURIComponent("https://YOUR_GITHUB_USERNAME.github.io/YOUR_REPO_NAME/main.html");
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user`;
}

// Logout
function logout() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    window.location.href = "index.html";
}

// Fetch Ollama Models
async function fetchModels() {
    try {
        const response = await fetch("http://127.0.0.1:11434/api/tags");
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        const modelDropdown = document.getElementById("model");
        modelDropdown.innerHTML = "";

        if (!data.models || data.models.length === 0) {
            modelDropdown.innerHTML = "<option>No models found</option>";
            return;
        }

        data.models.forEach(model => {
            const option = document.createElement("option");
            option.value = model.name;
            option.textContent = model.name;
            modelDropdown.appendChild(option);
        });
    } catch (error) {
        alert("Failed to load models. Ensure Ollama is running.");
    }
}

// Send Message to Ollama
async function sendMessage() {
    const model = document.getElementById("model").value;
    const userMessage = document.getElementById("userInput").value.trim();
    const chatBox = document.getElementById("chatBox");

    if (!model || model === "No models found" || !userMessage) {
        alert("Please select a model and enter a message.");
        return;
    }

    chatBox.innerHTML += `<div><strong>You:</strong> ${userMessage}</div>`;
    document.getElementById("userInput").value = "";

    try {
        const response = await fetch("http://127.0.0.1:11434/api/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ model: model, prompt: userMessage })
        });

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        chatBox.innerHTML += `<div><strong>Bot:</strong> ${data.response}</div>`;
        chatBox.scrollTop = chatBox.scrollHeight;
    } catch (error) {
        chatBox.innerHTML += `<div><strong>Bot:</strong> Error: ${error.message}</div>`;
    }
}
