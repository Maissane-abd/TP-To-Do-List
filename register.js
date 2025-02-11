document.getElementById("registerForm").addEventListener("submit", (event) => {
    event.preventDefault();

    let email = document.getElementById("email").value.trim();
    let pseudo = document.getElementById("pseudo").value.trim();
    let password = document.getElementById("password").value.trim();
    let confirmPassword = document.getElementById("confirmPassword").value.trim();

    if (password !== confirmPassword || pseudo === "" || email === "") {
        document.getElementById("errorMsg").style.display = "block";
        return;
    }

    // Get the users from the local storage
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // check if the user or email already exists
    let userExists = users.some(user => user.email === email || user.pseudo === pseudo);
    if (userExists) {
        alert("This email or pseudo already exits, Choose another one please.");
        return;
    }

    // create the new user object
    let newUser = { id: Date.now(), email, pseudo, password };
    users.push(newUser);
    
    // save the new user in the local storage
    localStorage.setItem("users", JSON.stringify(users));

    console.log("User save :", newUser);

    // redirect to the login page
    window.location.href = "index.html";
});
