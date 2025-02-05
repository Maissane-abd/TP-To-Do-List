document.getElementById("loginForm").addEventListener("submit", (event) => {
    event.preventDefault();

    let emailOrPseudo = document.getElementById("emailOrPseudo").value;
    let password = document.getElementById("password").value;
    let rememberMe = document.getElementById("rememberMe").checked;

    // Récupération de la liste des utilisateurs depuis le localStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Vérifier si l'utilisateur existe dans la liste
    let validUser = users.find(user => 
        (user.email === emailOrPseudo || user.pseudo === emailOrPseudo) && user.password === password
    );

    console.log("Utilisateur trouvé :", validUser);

    if (validUser) {
        // Sauvegarde l'utilisateur selon "Se souvenir de moi"
        if (rememberMe) {
            localStorage.setItem("userSession", JSON.stringify(validUser)); // Stockage permanent
        } else {
            sessionStorage.setItem("userSession", JSON.stringify(validUser)); // Stockage temporaire
        }

        // Redirige vers la page d'accueil
        window.location.href = "homepage.html";
    } else {
        // Affiche un message d'erreur
        document.querySelector(".errorMsg").style.display = "block";
    }
});
