 /*function getUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
}
function addUser(user) {
    const users = getUsers();
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
}
function findUser(username, password) {
    return getUsers().find(u => u.user === username && u.password === password);
}
function usernameExists(username) {
    return getUsers().some(u => u.user === username);
}
function setLoggedUser(user) {
    localStorage.setItem("loggedUser", JSON.stringify(user));
}
function getLoggedUser() {
    return JSON.parse(localStorage.getItem("loggedUser"));
}
function logout() {
    localStorage.removeItem("loggedUser");
    window.location.href = "login.html";
}
function redirectByRole(role) {
    if (role === "artista") {
        window.location.href = "principal.html";
    } 
    if (role === "oyente") {
        window.location.href = "principal.html";
    }
    if (role === "productor") {
        window.location.href = "admin.html";
    }  

}
*/

// esta es la que se agrega para consumir la api

    async function loginUsuario(usuario, contraseña) {
  try {
    const loginData = {
      usuario: usuario,
      contraseña: contraseña // usa el mismo nombre de campo que en tu backend
    };

    const response = await fetch("http://localhost:8000/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(loginData)
    });

    if (!response.ok) {
      throw new Error("Error en la solicitud: " + response.status);
    }

    const data = await response.json();

    // Guardar datos del usuario (puede ser token y rol)
    setLoggedUser(data);

    // Redirigir según rol (si la API devuelve algo como {rol: "artista"})
    if (data.rol) {
      redirectByRole(data.rol);
    }

    return data;
  } catch (error) {
    console.error("Error en login:", error);
    return null;
  }
}

// ---------- Registro de usuario (opcional) ----------
async function registrarUsuario(nombre_usuario, email, telefono, password, id_rol) {
  try {
    const userData = {
      nombre_usuario,
      email,
      telefono,
      contraseña: password,
      id_rol
    };

    const response = await fetch("http://localhost:8000/usuarios/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      throw new Error("Error en la solicitud: " + response.status);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en registro:", error);
    return null;
  }
}