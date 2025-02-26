// Sample tasks data
const sampleTasks = [
    {
      id: 1699000000000,
      taskName: "Complete JavaScript Project",
      dueDate: "10/30/2024",
      priority: "High",
      status: "pending"
    },
    {
      id: 1699000000001,
      taskName: "Review Team Documentation",
      dueDate: "12/05/2024",
      priority: "Medium",
      status: "completed"
    },
    {
      id: 1699000000002,
      taskName: "Update Website Content",
      dueDate: "12/05/2024",
      priority: "Low",
      status: "pending"
    },
    // {
    //   id: 1699000000003,
    //   taskName: "Prepare Monthly Report",
    //   dueDate: "2023-12-07",
    //   priority: "low",
    //   status: "pending"
    // },
    // {
    //   id: 1699000000004,
    //   taskName: "Team Meeting Notes",
    //   dueDate: "2023-12-08",
    //   priority: "medium",
    //   status: "pending"
    // },
    // {
    //   id: 1699000000005,
    //   taskName: "Debug Application",
    //   dueDate: "2023-12-10",
    //   priority: "medium",
    //   status: "pending"
    // },
    // {
    //   id: 1699000000006,
    //   taskName: "Update User Manual",
    //   dueDate: "2023-12-12",
    //   priority: "High",
    //   status: "pending"
    // },
    // {
    //   id: 1699000000007,
    //   taskName: "Backup Database",
    //   dueDate: "2023-12-15",
    //   priority: "high",
    //   status: "pending"
    // },
    // {
    //   id: 1699000000008,
    //   taskName: "Code Review Session",
    //   dueDate: "2023-12-18",
    //   priority: "low",
    //   status: "pending"
    // },
    // {
    //   id: 1699000000009,
    //   taskName: "Update Dependencies",
    //   dueDate: "12/20/2024",
    //   priority: "Low",
    //   status: "pending"
    // }
  ];
const taskName = document.getElementById("taskName");
const dueDate = document.getElementById("dueDate");
const taskList = document.getElementById("taskLists");
const selectedPriority = document.getElementById("selected-priority");
// Table
const tTaskName = document.getElementById("tTaskName");
const tDueDate = document.getElementById("tDueDate");
const tStatus = document.getElementById("tStatus");
// Get error spans
const taskNameError = document.getElementById("taskNameError");
const dueDateError = document.getElementById("dueDateError");
const priorityError = document.getElementById("priorityError");

// Get value from the dropdown selected option
function selectPriority(value) {
  // Update the selected priority text
  selectedPriority.innerHTML = value;
  selectedPriority.style.color = "black";

  // Get the dropdown element
  const dropdown = document.getElementById("dropdown-states");
  // Hide the dropdown by adding the 'hidden' class
  dropdown.classList.add("hidden");
}

const addTask = () => {
  const priorityValue = selectedPriority.innerHTML;

  // Clear previous error messages
  taskNameError.innerHTML = "";
  dueDateError.innerHTML = "";
  priorityError.innerHTML = "";

  // Check if fields are empty
  if (
    !taskName.value.trim() ||
    !dueDate.value ||
    priorityValue === "Select Priority"
  ) {
    if (!taskName.value.trim()) {
      taskNameError.innerHTML = `Required field`;
    }
    if (!dueDate.value) {
      dueDateError.innerHTML = `Required field`;
    }
    if (priorityValue === "Select Priority") {
      priorityError.innerHTML = `Required field`;
    }
    return;
  }

  // Get current date and selected date
  const currentDate = new Date();
  const selectedDate = new Date(dueDate.value);

  // Remove time portion for accurate date comparison
  currentDate.setHours(0, 0, 0, 0);
  selectedDate.setHours(0, 0, 0, 0);

  // Validate date
  if (selectedDate < currentDate) {
    dueDateError.innerHTML = `Cannot select past date`;
    return;
  }

  const newTask = {
    id: Date.now(),
    taskName: taskName.value,
    dueDate: selectedDate.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }),
    priority: priorityValue,
  };

  // Add the new task to the sampleTasks array
  if (newTask) {
    sampleTasks.push(newTask);
    taskName.value = "";
    dueDate.value = "";
    selectedPriority.innerHTML = "Select Priority";
    selectedPriority.style.color = "gray";
    // Display the updated list of tasks
    displaySampleTasks();
  }
};

function displaySampleTasks() {
  const tbody = taskList.querySelector("tbody");
  tbody.innerHTML = "";
  sampleTasks.forEach((task) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="px-6 py-4">${task.taskName}</td>
      <td class="px-6 py-4">${task?.dueDate}</td>
      <td class="px-6 py-4 font-medium ${getPriorityLabel(task.priority)}">${
      task.priority
    }</td>
      <td class="px-6 py-4">
        <button onclick="toggleStatus(${
          task.id
        })" class="text-white bg-yellow-600 hover:bg-yellow-700 px-3 py-1 rounded status-btn">
           Pending
        </button>
      </td>
    `;
    taskList.querySelector("tbody").appendChild(row);
  });
}

function getPriorityLabel(value) {
  switch (value) {
    case "High":
      return "text-red-500";
    case "Medium":
      return "text-yellow-500";
    case "Low":
      return "text-green-500";
    default:
      return "text-gray-500";
  }
}

// Add this function before the window.addEventListener line
function toggleStatus(taskId) {
  const button = event.target;
  if (button.innerText === "Pending") {
    button.innerText = "Completed";
    button.classList.remove("bg-yellow-600", "hover:bg-yellow-700");
    button.classList.add("bg-green-600", "hover:bg-green-700", "completed");
  } else {
    button.innerText = "Pending";
    button.classList.remove("bg-green-600", "hover:bg-green-700", "completed");
    button.classList.add("bg-yellow-600", "hover:bg-yellow-700");
  }
}

window.addEventListener("DOMContentLoaded", displaySampleTasks);
