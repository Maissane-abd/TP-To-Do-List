document.getElementById("registerForm").addEventListener("submit", (event) => {
    event.preventDefault();

    let email = document.getElementById("email").value.trim();
    let pseudo = document.getElementById("pseudo").value.trim();
    let password = document.getElementById("password").value.trim();
    let confirmPassword = document.getElementById("confirmPassword").value.trim();

    if (password !== confirmPassword) {
        document.getElementById("errorMsg").style.display = "block";
        return;
    }

    // Récupérer les utilisateurs existants
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Vérifier si l'email ou le pseudo est déjà utilisé
    let userExists = users.some(user => user.email === email || user.pseudo === pseudo);
    if (userExists) {
        alert("Cet email ou ce pseudo est déjà utilisé. Veuillez en choisir un autre.");
        return;
    }

    // Création d'un identifiant unique
    let newUser = { id: Date.now(), email, pseudo, password };
    users.push(newUser);
    
    // Sauvegarder la liste mise à jour des utilisateurs
    localStorage.setItem("users", JSON.stringify(users));

    console.log("Utilisateur enregistré :", newUser);

    // Redirige vers la page de connexion
    window.location.href = "index.html";
});
