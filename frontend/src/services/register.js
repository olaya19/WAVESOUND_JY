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

    // ---------------- VALIDACIONES ----------------

    // Nombre: letras + espacios (mín. 2 palabras)
    const nameRegex = /^[A-Za-zÁ-ÿ\s]{2,50}$/;
    if (!nameRegex.test(name)) {
        alert("El nombre solo puede contener letras y espacios (ej: Yeraldin Olaya).");
        return;
    }

    // Usuario: letras, números, . _ sin espacios
    const userRegex = /^[A-Za-z0-9._]{3,20}$/;
    if (!userRegex.test(user)) {
        alert("El usuario solo puede contener letras, números, '.' o '_' (sin espacios).");
        return;
    }

    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Por favor ingresa un correo válido (ej: yeral55@gmail.com).");
        return;
    }

    // Contraseña: 8-10 caracteres, sin espacios
    const passRegex = /^[^\s]{8,10}$/;
    if (!passRegex.test(password)) {
        alert("La contraseña debe tener entre 8 y 10 caracteres, sin espacios.");
        return;
    }

    // Rol
    if (!role) {
        alert("Selecciona un rol válido.");
        return;
    }

    // ---------------- PETICIÓN API ----------------
    try {
        const response = await fetch("http://127.0.0.1:8000/register/", {
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

        // ---------------- REDIRECCIÓN POR ROL ----------------
        if (role === "productor") {
            window.location.href = "autenticacion_productor.html";
        } else if (role === "artista") {
            window.location.href = "autenticacion_artista.html";
        } else if (role === "oyente") {
            alert("Usuario registrado con éxito");
            window.location.href = "login.html"; // pasa a login normal
        }

    } catch (err) {
        console.error("Error:", err);
        alert("Error de conexión con el servidor.");
    }
});

function showRegisterError(msg) {
    registerMessage.classList.add("error");
    registerMessage.textContent = msg;
}
