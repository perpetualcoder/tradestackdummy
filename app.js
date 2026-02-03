const STORAGE_KEY = "olive-task-poc-v1";

const statusLabels = {
  todo: "To Do",
  inprogress: "In Progress",
  review: "Review",
  done: "Done",
};

const initialTasks = [
  {
    id: "t1",
    title: "Finalize campaign brief",
    status: "todo",
    owner: "Ava",
    due: "Fri",
  },
  {
    id: "t2",
    title: "Design ad creatives",
    status: "inprogress",
    owner: "Leo",
    due: "Thu",
  },
  {
    id: "t3",
    title: "Press kit assets",
    status: "review",
    owner: "Jordan",
    due: "Wed",
  },
  {
    id: "t4",
    title: "Goals and KPIs aligned",
    status: "done",
    owner: "Team",
    due: "Completed",
  },
];

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

function loadTasks() {
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    state.tasks = initialTasks;
    saveTasks();
    return;
  }
  try {
    const parsed = JSON.parse(raw);
    state.tasks = Array.isArray(parsed) ? parsed : initialTasks;
  } catch (error) {
    state.tasks = initialTasks;
  }
}

function saveTasks() {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.tasks));
}

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
  checkbox.addEventListener("change", () => {
    updateTask(task.id, {
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
  statusSelect.addEventListener("change", () => {
    updateTask(task.id, { status: statusSelect.value });
  });

  const editButton = document.createElement("button");
  editButton.className = "btn small";
  editButton.type = "button";
  editButton.textContent = "Edit";
  editButton.addEventListener("click", () => {
    const updated = window.prompt("Update task title", task.title);
    if (updated && updated.trim()) {
      updateTask(task.id, { title: updated.trim() });
    }
  });

  const deleteButton = document.createElement("button");
  deleteButton.className = "btn small ghost";
  deleteButton.type = "button";
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => {
    if (window.confirm("Delete this task?")) {
      deleteTask(task.id);
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

function addTask(title, status) {
  const trimmed = title.trim();
  if (!trimmed) return;

  const newTask = {
    id: `t${Date.now()}`,
    title: trimmed,
    status,
    owner: "You",
    due: "Soon",
  };

  state.tasks = [newTask, ...state.tasks];
  saveTasks();
  renderTasks();
}

function updateTask(id, updates) {
  state.tasks = state.tasks.map((task) =>
    task.id === id ? { ...task, ...updates } : task
  );
  saveTasks();
  renderTasks();
}

function deleteTask(id) {
  state.tasks = state.tasks.filter((task) => task.id !== id);
  saveTasks();
  renderTasks();
}

function wireEvents() {
  taskForm.addEventListener("submit", (event) => {
    event.preventDefault();
    addTask(taskTitleInput.value, taskStatusSelect.value);
    taskTitleInput.value = "";
    taskTitleInput.focus();
  });

  searchInput.addEventListener("input", (event) => {
    state.search = event.target.value;
    renderTasks();
  });
}

loadTasks();
wireEvents();
renderTasks();
