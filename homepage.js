document.addEventListener("DOMContentLoaded", function () {
    const taskTitle = document.getElementById("taskTitle");
    const taskDescription = document.getElementById("taskDescription");
    const taskDeadline = document.getElementById("taskDeadline");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");
    const logoutBtn = document.getElementById("logoutBtn");

    //  Récupérer l'utilisateur connecté ou redirection
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {
        window.location.href = "index.html";
    }

    loadTasks();

    // Charger et afficher les tâches de l'utilisateur
    function loadTasks() {
        taskList.innerHTML = "";
        const tasks = JSON.parse(localStorage.getItem(`tasks_${currentUser.email}`)) || [];

        tasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <strong>${task.title}</strong> - ${task.description} (📅 ${task.deadline}) 
                <span class="${task.status === "Terminée" ? "completed" : "pending"}">${task.status}</span>
                ${task.status === "En cours" ? `<button class="complete-btn" data-index="${index}">✅ Done</button>` : ""}
                ${task.status === "En cours" ? `<button class="delete-btn" data-index="${index}">🗑️ Delete</button>` : ""}
            `;

            taskList.appendChild(li);
        });
    }

    // Ajouter une nouvelle tâche (Statut = "Doing" par défaut)
    addTaskBtn.addEventListener("click", function () {
        const title = taskTitle.value.trim();
        const description = taskDescription.value.trim();
        const deadline = taskDeadline.value;

        if (title === "" || description === "" || deadline === "") {
            alert("Please fill in all fields!");
            return;
        }

        const newTask = { title, description, deadline, status: "Doing" };
        const tasks = JSON.parse(localStorage.getItem(`tasks_${currentUser.email}`)) || [];
        tasks.push(newTask);
        localStorage.setItem(`tasks_${currentUser.email}`, JSON.stringify(tasks));

        loadTasks(); 

        taskTitle.value = "";
        taskDescription.value = "";
        taskDeadline.value = "";
    });

    // Gestion des actions sur les tâches (Terminer/Supprimer)
    taskList.addEventListener("click", function (event) {
        let tasks = JSON.parse(localStorage.getItem(`tasks_${currentUser.email}`)) || [];

        if (event.target.classList.contains("delete-btn")) {
            const index = event.target.dataset.index;
            tasks.splice(index, 1);
            localStorage.setItem(`tasks_${currentUser.email}`, JSON.stringify(tasks));
            loadTasks(); 
        }

        if (event.target.classList.contains("complete-btn")) {
            const index = event.target.dataset.index;
            tasks[index].status = "Terminée";
            localStorage.setItem(`tasks_${currentUser.email}`, JSON.stringify(tasks));
            loadTasks(); 
        }
    });

    // Déconnexion
    logoutBtn.addEventListener("click", function () {
        localStorage.removeItem("currentUser");
        window.location.href = "index.html";
    });

    // Chargement initial
    loadTasks();
});
