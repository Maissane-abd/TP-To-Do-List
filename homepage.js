document.addEventListener("DOMContentLoaded", function () {
    let userSession = JSON.parse(sessionStorage.getItem("userSession")) || JSON.parse(localStorage.getItem("userSession"));

    if (!userSession) {
        // Redirige vers la page de connexion si l'utilisateur n'est pas connecté
        window.location.href = "login.html";
    } else {
        console.log("Utilisateur connecté :", userSession);
        document.getElementById("welcomeMessage").innerText = `Bienvenue, ${userSession.pseudo} !`;
    }

    document.getElementById("logoutBtn").addEventListener("click", function () {
        localStorage.removeItem("userSession"); // Supprime l'utilisateur stocké
        sessionStorage.removeItem("userSession");
        window.location.href = "login.html";
    });
});
