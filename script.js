document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    const email = sanitizeInput(document.getElementById("email").value);
    const password = document.getElementById("password").value;

    const hashedPassword = await hashPassword(password);

    if (localStorage.getItem(email) === hashedPassword) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userName", email.split("@")[0]);
        window.location.href = "main.html";
    } else {
        document.getElementById("message").textContent = "Invalid login.";
    }
});

async function signup() {
    const email = sanitizeInput(document.getElementById("email").value);
    const password = document.getElementById("password").value;

    if (!email || !password) {
        alert("Please enter both email and password.");
        return;
    }

    const hashedPassword = await hashPassword(password);
    if (!localStorage.getItem(email)) {
        localStorage.setItem(email, hashedPassword);
        alert("Signup successful!");
    } else {
        alert("Email already exists.");
    }
}

function loginWithGitHub() {
    const clientId = "Ov23li1RjJKnUCc6dEsS";
    const redirectUri = encodeURIComponent("https://fishesarethings.github.io/Web4ollama/main.html"); 
    const scope = "user";

    window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
}

// Secure hashing function
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hashBuffer)).map(byte => byte.toString(16).padStart(2, '0')).join('');
}

// Basic input sanitization
function sanitizeInput(input) {
    return input.replace(/[<>"'/]/g, '');
}
