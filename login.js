document.getElementById("loginForm").addEventListener("submit", (event) => {
    event.preventDefault();

    let emailOrPseudo = document.getElementById("emailOrPseudo").value.trim();
    let password = document.getElementById("password").value.trim();
    let rememberMe = document.getElementById("rememberMe").checked;

    // Récupérer la liste des utilisateurs
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Vérifier si l'utilisateur existe
    let validUser = users.find(user => 
        (user.email === emailOrPseudo || user.pseudo === emailOrPseudo) && user.password === password
    );

    if (validUser) {
        localStorage.setItem("currentUser", JSON.stringify(validUser));

        window.location.href = "homepage.html";
    } else {
        document.querySelector(".errorMsg").style.display = "block";
    }
});