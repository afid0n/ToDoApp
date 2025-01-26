import { getClock } from "./clock.js";
const taskContainer = document.querySelector(".task-container");
const addForm = document.querySelector(".todo-add");
const addInput = addForm.querySelector("input");
const filterSelect = document.getElementById("tasks-filter");
const sortSelect = document.getElementById("tasks-sort");
const searchForm = document.querySelector(".todo-search");
const searchInput = searchForm.querySelector("input");
const pendingCounter = document.getElementById("counter");
const clearAllButton = document.getElementById("clear-all-btn");
const todoRender = document.querySelector('.todo-render')
class TodoItem {
    constructor(title, isDone = false) {
        this.id = Date.now();
        this.title = title;
        this.isDone = isDone;
        this.createdAt = new Date();
    }

    toggleDone() {
        this.isDone = !this.isDone;
    }

    updateTitle(newTitle) {
        this.title = newTitle;
    }
}

class TodoList {
    constructor() {
        this.todos = [];
    }

    addTodo(todo) {
        this.todos.push(todo);
    }

    deleteTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id);
    }

    searchTodos(query) {
        return this.todos.filter(todo =>
            todo.title.toLowerCase().includes(query.toLowerCase())
        );
    }

    filterTodos(filterOption) {
        if (filterOption === "completed") {
            return this.todos.filter(todo => todo.isDone);
        } else if (filterOption === "pending") {
            return this.todos.filter(todo => !todo.isDone);
        }
        return this.todos;
    }

    sortTodos(option) {

        if (option === "new-to-old") {
            return [...this.todos].sort((a, b) => b.createdAt - a.createdAt);
        } else if (option === "old-to-new") {
            return [...this.todos].sort((a, b) => a.createdAt - b.createdAt);
        }
        return this.todos;
    }
}

const todoList = new TodoList();

function updatePendingCount() {
    const pendingCount = todoList.todos.filter(todo => !todo.isDone).length;
    pendingCounter.textContent = pendingCount;
}

function renderTodos(todos) {
    taskContainer.innerHTML = "";
    if (todos.length === 0) {
        taskContainer.style.display = "none";
        //   todoRender.style.display= "none"
    } else {
        taskContainer.style.display = "flex";
        //   todoRender.style.display= "flex"
        todos.forEach(todo => {
            const taskElement = document.createElement("li");
            taskElement.id = "task";

            const taskText = document.createElement("span");
            taskText.textContent = todo.title;
            if (todo.isDone) taskText.style.textDecoration = "line-through";

            const buttonsDiv = document.createElement("div");
            buttonsDiv.className = "list-btns";

            const checkButton = document.createElement("button");
            checkButton.id = "check-btn";
            checkButton.innerHTML = '<i class="fa-solid fa-check"></i>';
            checkButton.addEventListener("click", () => {
                todo.toggleDone();
                renderTodos(todoList.todos);
                updatePendingCount();
            });

            const editButton = document.createElement("button");
            editButton.id = "edit-btn";
            editButton.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
            editButton.addEventListener("click", () => {
                const newTitle = prompt("Edit Task Title:", todo.title);
                if (newTitle) {
                    todo.updateTitle(newTitle);
                    renderTodos(todoList.todos);
                }

            });

            const deleteButton = document.createElement("button");
            deleteButton.id = "trash-btn";
            deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
            deleteButton.addEventListener("click", () => {
                todoList.deleteTodo(todo.id);
                renderTodos(todoList.todos);
                updatePendingCount();
            });

            buttonsDiv.append(checkButton, editButton, deleteButton);
            taskElement.append(taskText, buttonsDiv);
            taskContainer.appendChild(taskElement);
        });
    }
}

addForm.addEventListener("submit", e => {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'To Do added!',
        showConfirmButton: false,
        timer: 500
    })
    e.preventDefault();
    const title = addInput.value.trim();
    if (title) {
        const newTodo = new TodoItem(title);
        todoList.addTodo(newTodo);
        addInput.value = "";
        renderTodos(todoList.todos);
        updatePendingCount();
    }
});

filterSelect.addEventListener("change", () => {
    const filteredTodos = todoList.filterTodos(filterSelect.value);
    renderTodos(filteredTodos);
});

sortSelect.addEventListener("change", () => {
    const sortedTodos = todoList.sortTodos(sortSelect.value);
    renderTodos(sortedTodos);
});

searchForm.addEventListener("submit", e => {
    e.preventDefault();
    const query = searchInput.value.trim();
    const searchedTodos = todoList.searchTodos(query);
    renderTodos(searchedTodos);
});

clearAllButton.addEventListener("click", () => {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
        }
    });
    todoList.todos = [];
    renderTodos(todoList.todos);
    updatePendingCount();
});

renderTodos(todoList.todos);


