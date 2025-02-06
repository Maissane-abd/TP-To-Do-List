document.addEventListener("DOMContentLoaded", function () {
    let userSession = JSON.parse(sessionStorage.getItem("userSession")) || JSON.parse(localStorage.getItem("userSession"));

    if (!userSession) {
        // Redirige vers la page de connexion si l'utilisateur n'est pas connecté
        window.location.href = "index.html";
    } else {
        console.log("Utilisateur connecté :", userSession);
        document.getElementById("welcomeMessage").innerText = `Bienvenue, ${userSession.pseudo} !`;
    }

    document.getElementById("logoutBtn").addEventListener("click", function () {
        localStorage.removeItem("userSession"); // Supprime l'utilisateur stocké
        sessionStorage.removeItem("userSession");
        window.location.href = "index.html";
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const taskTitle = document.getElementById("taskTitle");
    const taskDescription = document.getElementById("taskDescription");
    const taskDeadline = document.getElementById("taskDeadline");
    const taskStatus = document.getElementById("taskStatus");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");

    // Afficher une tâche
    function displayTask(task) {
        const li = document.createElement("li");
        li.innerHTML = `
            <strong>${task.title}</strong> - ${task.description} (${task.deadline}) 
            <span class="${task.status === "Terminée" ? "completed" : "pending"}">${task.status}</span>
        `;
        taskList.appendChild(li);
    }

    // Charger les tâches depuis localStorage au démarrage
    function loadTasks() {
        taskList.innerHTML = "";
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach((task, index) => displayTask(task, index));
    }

    // Ajouter une nouvelle tâche
    addTaskBtn.addEventListener("click", function () {
        const title = taskTitle.value.trim();
        const description = taskDescription.value.trim();
        const deadline = taskDeadline.value;
        const status = taskStatus.value;

        if (title === "" || description === "" || deadline === "") {
            alert("Veuillez remplir tous les champs !");
            return;
        }

        const newTask = { title, description, deadline, status };
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push(newTask);
        localStorage.setItem("tasks", JSON.stringify(tasks));

        // Ajouter la tâche à l'affichage
        displayTask(newTask, tasks.length - 1);

        // Réinitialiser les champs
        taskTitle.value = "";
        taskDescription.value = "";
        taskDeadline.value = "";
    });

    // Charger les tâches existantes au démarrage
    loadTasks();
});

