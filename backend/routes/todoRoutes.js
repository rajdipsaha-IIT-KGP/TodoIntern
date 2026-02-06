const express = require("express");
const {
  newTodo,
  deleteTodo,
  editTodo,
  toggleTodoStatus,
  getTodos,
} = require("../controllers/todoControlleres");

const isAuth = require("../middlewares/isAuth");

const router = express.Router();

// Create a todo
router.post("/new", isAuth, newTodo);

// Get all todos of logged-in user
router.get("/all", isAuth, getTodos);

// Edit title / description
router.put("/edit/:id", isAuth, editTodo);

// Delete a todo
router.delete("/delete/:id", isAuth, deleteTodo);

// Toggle completed / not completed
router.patch("/:id/status", isAuth, toggleTodoStatus);

module.exports = router;
