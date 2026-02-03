const statusLabels = {
  todo: "To Do",
  inprogress: "In Progress",
  review: "Review",
  done: "Done",
};

const state = {
  tasks: [],
  search: "",
};

const taskLists = Array.from(document.querySelectorAll(".task-list"));
const counts = Array.from(document.querySelectorAll("[data-count]"));
const taskForm = document.getElementById("taskForm");
const taskTitleInput = document.getElementById("taskTitle");
const taskStatusSelect = document.getElementById("taskStatus");
const searchInput = document.getElementById("searchInput");
const progressValue = document.getElementById("progressValue");
const progressCaption = document.getElementById("progressCaption");
const openValue = document.getElementById("openValue");
const openCaption = document.getElementById("openCaption");
const focusValue = document.getElementById("focusValue");
const focusCaption = document.getElementById("focusCaption");

function createTaskElement(task) {
  const card = document.createElement("div");
  card.className = `task ${task.status === "done" ? "done" : ""}`.trim();

  const title = document.createElement("div");
  title.className = "task-title";
  title.textContent = task.title;

  const meta = document.createElement("div");
  meta.className = "task-meta";
  meta.textContent = `Owner: ${task.owner} · Due ${task.due}`;

  const controls = document.createElement("div");
  controls.className = "task-controls";

  const checkboxLabel = document.createElement("label");
  checkboxLabel.className = "task-check";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = task.status === "done";
  checkbox.addEventListener("change", async () => {
    await updateTask(task.id, {
      status: checkbox.checked ? "done" : "todo",
    });
  });

  const checkText = document.createElement("span");
  checkText.textContent = "Done";

  checkboxLabel.appendChild(checkbox);
  checkboxLabel.appendChild(checkText);

  const statusSelect = document.createElement("select");
  statusSelect.className = "status-select";
  Object.entries(statusLabels).forEach(([value, label]) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = label;
    if (task.status === value) {
      option.selected = true;
    }
    statusSelect.appendChild(option);
  });
  statusSelect.addEventListener("change", async () => {
    await updateTask(task.id, { status: statusSelect.value });
  });

  const editButton = document.createElement("button");
  editButton.className = "btn small";
  editButton.type = "button";
  editButton.textContent = "Edit";
  editButton.addEventListener("click", async () => {
    const updated = window.prompt("Update task title", task.title);
    if (updated && updated.trim()) {
      await updateTask(task.id, { title: updated.trim() });
    }
  });

  const deleteButton = document.createElement("button");
  deleteButton.className = "btn small ghost";
  deleteButton.type = "button";
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", async () => {
    if (window.confirm("Delete this task?")) {
      await deleteTask(task.id);
    }
  });

  controls.appendChild(checkboxLabel);
  controls.appendChild(statusSelect);
  controls.appendChild(editButton);
  controls.appendChild(deleteButton);

  card.appendChild(title);
  card.appendChild(meta);
  card.appendChild(controls);

  return card;
}

function renderTasks() {
  taskLists.forEach((list) => {
    list.innerHTML = "";
  });

  const filtered = state.tasks.filter((task) =>
    task.title.toLowerCase().includes(state.search.toLowerCase())
  );

  filtered.forEach((task) => {
    const list = document.querySelector(
      `.task-list[data-status="${task.status}"]`
    );
    if (list) {
      list.appendChild(createTaskElement(task));
    }
  });

  updateCounts(filtered);
}

function updateCounts(filtered) {
  const countsByStatus = {
    todo: 0,
    inprogress: 0,
    review: 0,
    done: 0,
  };

  filtered.forEach((task) => {
    countsByStatus[task.status] += 1;
  });

  counts.forEach((element) => {
    const status = element.dataset.count;
    element.textContent = countsByStatus[status] ?? 0;
  });

  const total = filtered.length;
  const done = countsByStatus.done;
  const open = total - done;
  const progress = total === 0 ? 0 : Math.round((done / total) * 100);

  progressValue.textContent = `${progress}%`;
  progressCaption.textContent =
    total === 0
      ? "No tasks yet"
      : progress >= 70
        ? "On track for launch"
        : "Keep the momentum going";

  openValue.textContent = String(open);
  openCaption.textContent =
    open === 0 ? "All caught up" : `${open} tasks in motion`;

  focusValue.textContent =
    countsByStatus.inprogress > 0 ? "In Progress" : "Planning";
  focusCaption.textContent =
    countsByStatus.inprogress > 0
      ? "Concentrate on active work"
      : "Start with the next priority";
}

async function addTask(title, status) {
  const trimmed = title.trim();
  if (!trimmed) return;

  try {
    const response = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: trimmed,
        status,
        owner: "You",
        due: "Soon",
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create task.");
    }

    await loadTasks();
  } catch (error) {
    console.error(error);
    alert("Could not create task.");
  }
}

async function updateTask(id, updates) {
  try {
    const response = await fetch(`/api/tasks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      throw new Error("Failed to update task.");
    }

    await loadTasks();
  } catch (error) {
    console.error(error);
    alert("Could not update task.");
  }
}

async function deleteTask(id) {
  try {
    const response = await fetch(`/api/tasks/${id}`, {
      method: "DELETE",
    });

    if (!response.ok && response.status !== 204) {
      throw new Error("Failed to delete task.");
    }

    await loadTasks();
  } catch (error) {
    console.error(error);
    alert("Could not delete task.");
  }
}

function wireEvents() {
  taskForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    await addTask(taskTitleInput.value, taskStatusSelect.value);
    taskTitleInput.value = "";
    taskTitleInput.focus();
  });

  searchInput.addEventListener("input", (event) => {
    state.search = event.target.value;
    renderTasks();
  });
}

async function loadTasks() {
  try {
    const response = await fetch("/api/tasks");
    if (!response.ok) {
      throw new Error("Failed to load tasks.");
    }
    state.tasks = await response.json();
  } catch (error) {
    console.error(error);
    state.tasks = [];
  }

  renderTasks();
}

wireEvents();
loadTasks();
