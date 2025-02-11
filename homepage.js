document.addEventListener("DOMContentLoaded", function () {
    const taskTitle = document.getElementById("taskTitle");
    const taskDescription = document.getElementById("taskDescription");
    const taskDeadline = document.getElementById("taskDeadline");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");
    const logoutBtn = document.getElementById("logoutBtn");
    const searchTask = document.getElementById("searchTask");
    const filterStatus = document.getElementById("filterStatus");

    // Retrieve the logged-in user
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {
        window.location.href = "index.html"; 
    }

    loadTasks(); // Load tasks on display

    // Load and display the user's tasks
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
                <span class="task-status ${task.status === "Completed" ? "completed" : "pending"}">${task.status === "Completed" ? "Completed" : "In Progress"}</span>
                ${task.status === "In Progress" ? `<button class="complete-btn" data-index="${index}">✅ Complete</button>` : ""}
                ${task.status === "In Progress" ? `<button class="delete-btn" data-index="${index}">🗑️ Delete</button>` : ""}
            `;

            taskList.appendChild(li);
            }
        });
    }

    // Add a new task (Status = "In Progress" by default)
    addTaskBtn.addEventListener("click", function () {
        const title = taskTitle.value.trim();
        const description = taskDescription.value.trim();
        const deadline = taskDeadline.value;

        if (title === "" || description === "" || deadline === "") {
            alert("Please fill in all fields and choose a valid date!");
            return;
        }

        const newTask = { title, description, deadline, status: "In Progress" };
        const tasks = JSON.parse(localStorage.getItem(`tasks_${currentUser.email}`)) || [];
        tasks.push(newTask);
        localStorage.setItem(`tasks_${currentUser.email}`, JSON.stringify(tasks));

        loadTasks(); // 🔄 Refresh display

        // Reset fields
        taskTitle.value = "";
        taskDescription.value = "";
        taskDeadline.value = "";
    });

    // Manage task actions (Complete/Delete)
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
            tasks[index].status = "Completed";
            localStorage.setItem(`tasks_${currentUser.email}`, JSON.stringify(tasks));
            loadTasks(); 
        }
    });

    // Search function
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

    // Apply filters (Search + Status)
    searchTask.addEventListener("input", loadTasks);
    filterStatus.addEventListener("change", loadTasks);

    // Logout
    logoutBtn.addEventListener("click", function () {
        localStorage.removeItem("currentUser");
        window.location.href = "index.html";
    });

    // Initial loading
    loadTasks();
});