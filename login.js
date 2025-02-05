document.getElementById("loginForm").addEventListener("submit", (event) => {
    event.preventDefault();

    let emailOrPseudo = document.getElementById("emailOrPseudo").value;
    let password = document.getElementById("password").value;

    // Récupération de la liste des utilisateurs depuis le localStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Vérifier si l'utilisateur existe dans la liste
    let validUser = users.find(user => 
        (user.email === emailOrPseudo || user.pseudo === emailOrPseudo) && user.password === password
    );

    console.log("Utilisateur trouvé :", validUser);

    if (validUser) {
        // Sauvegarde la session utilisateur
        localStorage.setItem("userSession", JSON.stringify(validUser));

        // Redirige vers la page d'accueil
        window.location.href = "homepage.html";
    } else {
        // Affiche un message d'erreur
        document.querySelector(".errorMsg").style.display = "block";
    }
});
