function checkSession() {
    const user = getLoggedUser();
    console.log (user)
    if (!user) {
        window.location.href = "login.html";
    } 
    else 
        {
        if (window.location.pathname.endsWith("admin.html") && user.role !== "productor") {
            redirectByRole(user.role);
        }
        if (window.location.pathname.endsWith("principal.html") && user.role !== "oyente") {
            redirectByRole(user.role);
        }
        if (window.location.pathname.endsWith("principal.html") && user.role !== "artista") {
            redirectByRole(user.role);
        }
    }
}


        