
let taskList = [];

if (localStorage.getItem("taskList") !== null) {
    taskList = JSON.parse(localStorage.getItem("taskList"))
}

let editId;
let isEditTask = false;
const taskInput = document.querySelector("#txtTaskName");
const btnClear = document.querySelector("#btnClear");
const filters = document.querySelectorAll(".filters span")

displayTasks("all");

function displayTasks(filter) {
    let ul = document.getElementById('task-list');
    ul.innerHTML = "";

    if (taskList.length == 0) {
        ul.innerHTML = "<p class='p-3 m-0'>Task list is empty!</p>"
    } else {
        for (let task of taskList) {

            let completed = task.status == "completed" ? "checked" : "";

            if (filter == task.status || filter == "all") {

                let li = `
                <li class="task list-group-item">
                    <div class="form-check">
                        <input type="checkbox" onClick="updateStatus(this)" id="${task.id}" class="form-check-input" ${completed}>
                        <label for="${task.id}" class="form-check-label ${completed} ">${task.taskName} </label>
                    </div>
                    <div class="dropdown">
                        <button class="btn btn-link dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="fa-solid fa-ellipsis"></i>
                        </button>
                        <ul class="dropdown-menu">
                            <li><a onclick="deleteTask(${task.id})" class="dropdown-item" href="#"><i class="fa-solid fa-trash"></i> Delete</a></li>
                            <li><a onclick="editTask(${task.id}, '${task.taskName}')" class="dropdown-item" href="#"><i class="fa-solid fa-pen"></i> Edit</a></li>
                        </ul>
                    </div>
                </li>            
            `;

                ul.insertAdjacentHTML('beforeend', li);

            }
        }
    }
}

btnClear.addEventListener("click", function () {
    taskList.splice(0, taskList.length);
    localStorage.setItem("taskList", JSON.stringify(taskList));
    displayTasks("all");
});

document.querySelector("#btnAddNewTask").addEventListener("click", newTask);

for (let span of filters) {
    span.addEventListener("click", function () {
        document.querySelector("span.active").classList.remove("active");
        span.classList.add("active");
        displayTasks(span.id)
        
    })
}

function newTask(e) {

    if (taskInput.value == "") {
        alert("Add a task!")
    } else {
        if (!isEditTask) {
            
            taskList.push({ "id": taskList.length + 1, "taskName": taskInput.value, "status": "pending" });
        } else {
            
            for (let task of taskList) {
                if (task.id == editId) {
                    task.taskName = taskInput.value;

                }
                isEditTask = false;
            }
        }

        displayTasks(document.querySelector("span.active").id);
        taskInput.value = ""
        localStorage.setItem("taskList", JSON.stringify(taskList));

    }
    e.preventDefault();
};

function deleteTask(id) {

    let deletedID;
    deletedID = taskList.findIndex(task => task.id == id);
    taskList.splice(deletedID, 1);
    displayTasks(document.querySelector("span.active").id);
    localStorage.setItem("taskList", JSON.stringify(taskList));
}

function editTask(taskID, taskName) {
    editId = taskID;
    isEditTask = true;
    taskInput.value = taskName;
    taskInput.focus();
    taskInput.classList.add("active");
}

function updateStatus(selectedTask) {
    let label = selectedTask.nextElementSibling;
    let status;
    if (selectedTask.checked) {
        label.classList.add("checked");
        status = "completed";
    } else {
        label.classList.remove("checked");
        status = "pending";
    }

    for (let task of taskList) {
        if (task.id == selectedTask.id) {
            task.status = status;
        }
    }

    displayTasks(document.querySelector("span.active").id);
    localStorage.setItem("taskList", JSON.stringify(taskList));
}








