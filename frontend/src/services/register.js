const nameInput = document.getElementById("name");
const userInput = document.getElementById("user");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const roleSelect = document.getElementById("role");

const registerForm = document.getElementById("registerForm");
registerForm?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const role = roleSelect.value.trim();
    const user = userInput.value.trim();

    if (!name || !user || !email || !role || !password) {
        alert("Todos los campos son obligatorios");
        return;
    }

    try {
        const response = await fetch("http://127.0.0.1:8000/register/", {  // 👉 Ajusta la URL según tu API
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: name,
                username: user,
                email: email,
                password: password,
                role: role
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            alert("Error en el registro: " + (errorData.detail || response.statusText));
            return;
        }

        alert("Usuario registrado con éxito");
        window.location.href = "login.html"; // Ir al login
    } catch (err) {
        console.error("Error:", err);
        alert("Error de conexión con el servidor.");
    }
});

function showRegisterError(msg) {
    registerMessage.classList.add("error");
    registerMessage.textContent = msg;
}
