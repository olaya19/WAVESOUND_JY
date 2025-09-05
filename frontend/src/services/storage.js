function getUsers() {
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


// esta es la que se agrega para consumir la api

    /* async function loginUsuario(user, password) {
    try {
        Datos para enviar al login
        const loginData = {
            correo_usuario: user,
            clave_usuario: password
        };

            Petición POST al login
            const response = await fetch("http://localhost:3001/api/usuario/login/", {
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
        return (data.datos)

        

    } catch (error) {
        console.error("Error:", error);
        return null
    }

    

} */