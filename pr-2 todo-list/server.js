const express = require("express");
const server = express();

server.use(express.urlencoded({ extended: true }));

server.set("view engine", "ejs");

let todoList = [
  {
    id: "101",
    task: "Complete React Assignment",
    description: "Finish the Redux part before class",
    dueDate: "2025-07-22T17:00",
    priority: "High"
  },
  {
    id: "102",
    task: "Grocery Shopping",
    description: "Buy milk, bread, and fruits",
    dueDate: "2025-07-21T19:00",
    priority: "Medium"
  },
  {
    id: "103",
    task: "Workout",
    description: "Do cardio and abs workout",
    dueDate: "2025-07-21T20:00",
    priority: "Low"
  }
];

server.post("/add_task", (req, res) => {
  const newTask = req.body;
  newTask.id = todoList.length + 101;
  todoList.push(newTask);
  res.redirect("/");
});

server.get("/", (req, res) => {
  res.render("index", { todoList , editingTask : null });
});

server.get("/delete/:id", (req, res) => {
  let id = req.params.id;
  let newtodo = todoList.filter(task => task.id !== id);
  todoList = newtodo;
  res.redirect("/");
})

server.get("/edit/:id", (req, res) => {
  const id = req.params.id;
  const task = todoList.find(t => t.id == id);

  res.render("index", {
    todoList,
    editingTask: task
  });
});


server.post("/update/:id", (req, res) => {
  const id = req.params.id;
  const index = todoList.findIndex(t => t.id == id);

  if (index !== -1) {
    todoList[index] = {
      id,
      task: req.body.task,
      description: req.body.description,
      dueDate: req.body.dueDate,
      priority: req.body.priority
    };
  }

  res.redirect("/");
});


server.listen(8000, () => {
  console.log("Server is running at http://localhost:8000");
})