const nameInput = document.getElementById("name");
const userInput = document.getElementById("user");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const roleSelect = document.getElementById("role");


const registerForm = document.getElementById("registerForm");
registerForm?.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const role = roleSelect.value.trim();
    const user = userInput.value.trim();


    if (!name || !user|| !email || !role || !password) {
            alert("Todos los campos son obligatorios");
            return;
        }

       if (getUsers().some(u => u.user === user)) {
            alert("Ese nombre de usuario ya existe");
            return;
        }


    const newUser = { name, user ,email, password, role };
    addUser(newUser);

    alert("Usuario registrado con éxito");
    window.location.href = "login.html"; // Ir al login
});

function showRegisterError(msg) {
    registerMessage.classList.add("error");
    registerMessage.textContent = msg;
}