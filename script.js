document.getElementById("loginForm")?.addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (email === "user@example.com") {
        document.getElementById("message").textContent = "Blocked account.";
        return;
    }

    sessionStorage.setItem("isLoggedIn", "true");
    sessionStorage.setItem("userEmail", email);
    window.location.href = "main.html";
});

function logout() {
    sessionStorage.clear();
    window.location.href = "index.html";
}

async function fetchModels() {
    try {
        const response = await fetch("http://127.0.0.1:11434/api/tags");
        const data = await response.json();
        const modelDropdown = document.getElementById("model");

        modelDropdown.innerHTML = "";
        data.models.forEach(model => {
            const option = document.createElement("option");
            option.value = model.name;
            option.textContent = model.name;
            modelDropdown.appendChild(option);
        });
    } catch (error) {
        alert("Ollama is not running!");
    }
}

async function sendMessage() {
    const model = document.getElementById("model").value;
    const userMessage = document.getElementById("userInput").value.trim();
    const chatBox = document.getElementById("chatBox");

    chatBox.innerHTML += `<div><strong>You:</strong> ${userMessage}</div>`;

    const response = await fetch("http://127.0.0.1:11434/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: model, prompt: userMessage })
    });

    const data = await response.json();
    chatBox.innerHTML += `<div><strong>Bot:</strong> ${data.response}</div>`;
}
