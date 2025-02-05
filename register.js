document.getElementById("registerForm").addEventListener("submit", (event) => {
    event.preventDefault();

    let email = document.getElementById("email").value;
    let pseudo = document.getElementById("pseudo").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        document.getElementById("errorMsg").style.display = "block";
        return;
    }

    // Récupérer les utilisateurs existants ou initialiser un tableau vide
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Vérifier si l'email ou le pseudo est déjà utilisé
    let userExists = users.some(user => user.email === email || user.pseudo === pseudo);
    if (userExists) {
        alert("This email or nickname is already in use. Please choose another one.");
        return;
    }

    // Ajouter le nouvel utilisateur au tableau
    let newUser = { email, pseudo, password };
    users.push(newUser);
    
    // Sauvegarder la liste mise à jour des utilisateurs dans le localStorage
    localStorage.setItem("users", JSON.stringify(users));

    console.log("Registered users:", users);

    // Redirige vers la page de connexion
    window.location.href = "login.html";
});
