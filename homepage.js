document.addEventListener("DOMContentLoaded", function () {
    const taskTitle = document.getElementById("taskTitle");
    const taskDescription = document.getElementById("taskDescription");
    const taskDeadline = document.getElementById("taskDeadline");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");
    const logoutBtn = document.getElementById("logoutBtn");
    const searchTask = document.getElementById("searchTask");
    const filterStatus = document.getElementById("filterStatus");

    // Récupérer l'utilisateur connecté
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {
        window.location.href = "index.html"; 
    }

    loadTasks(); // Charger les tâches à l'affichage

    // Charger et afficher les tâches de l'utilisateur
    function loadTasks() {
        taskList.innerHTML = "";
        const tasks = JSON.parse(localStorage.getItem(`tasks_${currentUser.email}`)) || [];
        const searchValue = searchTask.value.toLowerCase();
        const selectedStatus = filterStatus.value;

        tasks.forEach((task, index) => {
            if (
                (selectedStatus === "all" || task.status === selectedStatus) &&
                (task.title.toLowerCase().includes(searchValue) || task.description.toLowerCase().includes(searchValue))
            ) {
            const li = document.createElement("li");
            li.classList.add("task-item");
            li.innerHTML = `
                <strong class="task-title">${task.title}</strong>
                <span class="task-desc">${task.description}</span>
                <span class="task-deadline">📅 ${task.deadline}</span>
                <span class="task-status ${task.status === "Terminée" ? "completed" : "pending"}">${task.status}</span>
                ${task.status === "En cours" ? `<button class="complete-btn" data-index="${index}">✅ Terminer</button>` : ""}
                ${task.status === "En cours" ? `<button class="delete-btn" data-index="${index}">🗑️ Supprimer</button>` : ""}
            `;

            taskList.appendChild(li);
            }
        });
    }

    // Ajouter une nouvelle tâche (Statut = "En cours" par défaut)
    addTaskBtn.addEventListener("click", function () {
        const title = taskTitle.value.trim();
        const description = taskDescription.value.trim();
        const deadline = taskDeadline.value;

        if (title === "" || description === "" || deadline === "") {
            alert("Veuillez remplir tous les champs !");
            return;
        }

        const newTask = { title, description, deadline, status: "En cours" };
        const tasks = JSON.parse(localStorage.getItem(`tasks_${currentUser.email}`)) || [];
        tasks.push(newTask);
        localStorage.setItem(`tasks_${currentUser.email}`, JSON.stringify(tasks));

        loadTasks(); // 🔄 Mise à jour de l'affichage

        // Réinitialiser les champs
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

    // Fonction de recherche
    document.getElementById("searchTask").addEventListener("input", function () {
        let searchValue = this.value.toLowerCase();
        let tasks = document.querySelectorAll(".task-item");

        tasks.forEach(task => {
            let title = task.querySelector(".task-title").textContent.toLowerCase();
            let description = task.querySelector(".task-desc").textContent.toLowerCase();

            if (title.includes(searchValue) || description.includes(searchValue)) {
                task.style.display = "flex";
            } else {
                task.style.display = "none";
            }
        });
    });

    // Appliquer les filtres (Recherche + Statut)
    searchTask.addEventListener("input", loadTasks);
    filterStatus.addEventListener("change", loadTasks);

    // Déconnexion
    logoutBtn.addEventListener("click", function () {
        localStorage.removeItem("currentUser");
        window.location.href = "index.html";
    });

    // Chargement initial
    loadTasks();
});
