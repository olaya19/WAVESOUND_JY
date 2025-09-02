

const loginUsernameInput = document.getElementById("username");
const loginPasswordInput = document.getElementById("password");

const loginForm = document.getElementById("loginForm");
loginForm?.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = loginUsernameInput.value.trim();
    const password = loginPasswordInput.value.trim();

    if (!username || !password) {
        alert ("Por favor, completa usuario y contraseña.");
        return;
    }


  // -------------  ORIGINAL ---------------------------
    
    const user = findUser(username, password);

        if (!user) {
            alert("Usuario o contraseña incorrectos");
            return;
        }

        setLoggedUser(user);

        // Redirigir según el rol
        if (user.role === "admin") {
            window.location.href = "admin.html";
        } else {
            window.location.href = "principal.html";
        }
   //---------------------------------------------------
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