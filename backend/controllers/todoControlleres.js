const Todo = require("../models/TodoModel");
const TryCatch = require("../utils/TryCatch");

/* ================= CREATE TODO ================= */
const newTodo = TryCatch(async (req, res) => {
  const { title, description } = req.body;

  const todo = await Todo.create({
    title,
    description,
    user: req.user._id,
  });

  res.status(201).json({
    message: "Task added successfully",
    todo,
  });
});

/* ================= DELETE TODO ================= */
const deleteTodo = TryCatch(async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    return res.status(404).json({ message: "Todo not found" });
  }

  if (todo.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  await todo.deleteOne();

  res.status(200).json({ message: "Task deleted" });
});

/* ================= EDIT TODO ================= */
const editTodo = TryCatch(async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    return res.status(404).json({ message: "Todo not found" });
  }

  if (todo.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  todo.title = req.body.title || todo.title;
  todo.description = req.body.description || todo.description;

  await todo.save();

  res.status(200).json({
    message: "Todo updated successfully",
    todo,
  });
});

/* ================= TOGGLE TODO STATUS ================= */
const toggleTodoStatus = TryCatch(async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    return res.status(404).json({ message: "Todo not found" });
  }

  if (todo.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  todo.completed = !todo.completed;
  await todo.save();

  res.status(200).json({
    message: "Todo status updated",
    todo,
  });
});

/* ================= GET USER TODOS ================= */
const getTodos = TryCatch(async (req, res) => {
  const todos = await Todo.find({ user: req.user._id }).sort({ createdAt: -1 });

  res.status(200).json({ todos:todos });
});

module.exports = {
  newTodo,
  deleteTodo,
  editTodo,
  toggleTodoStatus,
  getTodos,
};
