document.addEventListener("DOMContentLoaded", function () {
    const taskTitle = document.getElementById("taskTitle");
    const taskDescription = document.getElementById("taskDescription");
    const taskDeadline = document.getElementById("taskDeadline");
    const taskStatus = document.getElementById("taskStatus");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");
    const currentUserDisplay = document.getElementById("currentUserDisplay");
    const logoutBtn = document.getElementById("logoutBtn");

    // Récupérer l'utilisateur connecté
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {
        window.location.href = "index.html"; 
    } else {
        currentUserDisplay.textContent = `Connecté en tant que : ${currentUser.pseudo}`;
        loadTasks(); 
    }

    // Charger les tâches du user connecté
    function loadTasks() {
        taskList.innerHTML = "";
        const tasks = JSON.parse(localStorage.getItem(`tasks_${currentUser.id}`)) || [];
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
        const tasks = JSON.parse(localStorage.getItem(`tasks_${currentUser.id}`)) || [];
        tasks.push(newTask);
        localStorage.setItem(`tasks_${currentUser.id}`, JSON.stringify(tasks));

        // Ajouter la tâche à l'affichage
        displayTask(newTask, tasks.length - 1);

        // Réinitialiser les champs
        taskTitle.value = "";
        taskDescription.value = "";
        taskDeadline.value = "";
    });

    // Afficher une tâche
    function displayTask(task) {
        const li = document.createElement("li");
        li.innerHTML = `
            <strong>${task.title}</strong> - ${task.description} (${task.deadline}) 
            <span class="${task.status === "Terminée" ? "completed" : "pending"}">${task.status}</span>
        `;
        taskList.appendChild(li);
    }

    // Déconnexion (supprimer l'utilisateur connecté)
    logoutBtn.addEventListener("click", function () {
        localStorage.removeItem("currentUser");
        window.location.href = "index.html";
    });

    // Charger les tâches existantes au démarrage
    loadTasks();
});