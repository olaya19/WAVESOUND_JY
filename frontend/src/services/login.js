const loginUsernameInput = document.getElementById("username");
const loginPasswordInput = document.getElementById("password");

const loginForm = document.getElementById("loginForm");
loginForm?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = loginUsernameInput.value.trim();
    const password = loginPasswordInput.value.trim();

    if (!username || !password) {
        alert("Por favor, completa usuario y contraseña.");
        return;
    }

    try {
        const response = await fetch("http://127.0.0.1:8000/login", { // 👉 Ajusta la URL según tu API
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: username, password: password })
        });

        const data = await response.json();

        if (!response.ok) {
            showError(data.detail || "Usuario o contraseña incorrectos");
            return;
        }

        // Guardamos el usuario en localStorage (o el token si tu API lo devuelve)
        localStorage.setItem("loggedUser", JSON.stringify(data));

        // Redirigir según el rol
        if (data.role === "admin") {
            window.location.href = "admin.html";
        } else {
            window.location.href = "principal.html";
        }
    } catch (err) {
        console.error("Error:", err);
        alert("Error de conexión con el servidor.");
    }
});

function showError(msg) {
    loginMessage.classList.add("error");
    loginMessage.textContent = msg;
}


 //-------------------  CON PROMESAS  --------------------------
    
    /*loginUsuario(username, password)
    .then(datos => {
        if (datos.length > 0) {

            let user={
                name: datos[0].nombre_usuario,
                username: datos[0].correo_usuario,
                password: datos[0].clave_usuario,
                role: datos[0].rol_usuario
            };
            console.log (user)
            setLoggedUser(user);
            loginMessage.classList.add("success");
            loginMessage.textContent = "Inicio de sesión exitoso. Redirigiendo…";
            setTimeout(() => redirectByRole(user.role), 500);
            
        
        }
            
        else 
            console.log(" no exite en la base de datos:");
            showError("Credenciales inválidas. Verifica e intenta nuevamente.");
            return;



    })
    .catch(err => console.error("Error:", err));

    */
    
    //---------------------------------------------------