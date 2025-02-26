// Hash function for passwords
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
}

// Sanitize user input to prevent script injection
function sanitizeInput(input) {
    return input.replace(/[<>"'/]/g, '');
}

// Handle login
document.getElementById("loginForm").addEventListener("submit", async function (event) {
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

// Handle signup
async function signup() {
    const email = sanitizeInput(document.getElementById("email").value);
    const password = document.getElementById("password").value;

    if (!email || !password) {
        alert("Please fill in both fields.");
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

// GitHub OAuth login
function loginWithGitHub() {
    const clientId = "Ov23li1RjJKnUCc6dEsS";
    const redirectUri = encodeURIComponent("https://fishesarethings.github.io/Web4ollama/main.html");
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user`;
}
