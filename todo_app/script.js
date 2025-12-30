const taskInput = document.querySelector("#taskInput");
const addButton = document.querySelector("#addTaskButton");
const completeButton = document.querySelector(".completed");
const deleteButton = document.querySelector(".delete");
const taskContainer = document.querySelector(".taskList-container");
const randomColor = [
  "#00F5D4", // neon mint
  "#3A86FF", // electric blue
  "#FFBE0B", // warm neon yellow
  "#FB5607", // soft neon orange
  "#FF006E", // neon pink (balanced)
  "#8338EC", // neon purple
  "#06D6A0", // aqua green
  "#EF476F", // coral neon
  "#4CC9F0", // sky neon
  "#B8F2E6", // light mint neon
];

taskInput.addEventListener("input", () => {
  let randomIndex = Math.floor(Math.random() * randomColor.length);
  taskInput.style.color = `${randomColor[randomIndex]}`;
});

addButton.addEventListener("pointerdown", addTask);
taskInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault(); // prevent form submission or newline
        addTask();          // call same function
    }
});

taskContainer.addEventListener("pointerdown",(e)=>{
  if(e.target.classList.contains("delete")){
    e.target.closest(".task-list").remove()
  }
})

function addTask() {
  let taskText = taskInput.value.trim();
  if(taskText.length > 60){
    return alert("task too long try short one")
  }
  if (taskText === "" || !taskText) {
    return alert("you cannot add empty task");
  }

  if (/\d/.test(taskText)) {
    taskInput.value = "";
    return alert("Tasks must contain only text, no numbers!");
  }
  let div = document.createElement("div");
  div.classList.add("task-list");
  let paragraph = document.createElement("p");
  paragraph.classList.add("task");
  let childDiv = document.createElement("div");
  childDiv.classList.add("button");
  let deleteButton = document.createElement("button");
  deleteButton.classList.add("delete");
  deleteButton.innerText = "delete";
  let completeButton = document.createElement("button");
  completeButton.classList.add("completed");
  completeButton.innerText = "complete";
  taskContainer.appendChild(div);
  div.append(paragraph, childDiv);
  childDiv.append(deleteButton, completeButton);
  paragraph.innerText =taskText;
  div.scrollIntoView({ behavior: "smooth", block: "end" });
  taskInput.value = "";
}
