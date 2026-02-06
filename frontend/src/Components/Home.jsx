import { useEffect, useState, useRef } from "react";
import {
  FaUserCircle,
  FaSignOutAlt,
  FaPlus,
  FaTrash,
  FaCheckCircle,
  FaEdit,
  FaTimes,
} from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // 🔹 modal states
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const [menuOpen, setMenuOpen] = useState(false);

  const { logout,isAuth } = useAuth();
  const navigate = useNavigate();
 const menuRef = useRef(null);



 const hasShownToast = useRef(false);

useEffect(() => {
  if (!isAuth && !hasShownToast.current) {
    hasShownToast.current = true;

    toast.error("Login first");

    const timer = setTimeout(() => {
      navigate("/login", { replace: true });
    }, 1500);

    return () => clearTimeout(timer);
  }
}, [isAuth, navigate]);
  /* ================= FETCH TODOS ================= */
  const fetchTodos = async () => {
    try {
        if(!isAuth)
            return toast.error("Login First")
      const { data } = await axios.get(
        "https://todointern-1.onrender.com/api/todos/all"
      );
      setTodos(data.todos);
    } catch {
         if(!isAuth)
            return toast.error("Login First")
      toast.error("Failed to load todos");
    }
  };




  useEffect(() => {
    fetchTodos();
  }, []);

  /* ================= ADD TODO ================= */
  const addTodo = async () => {
    if(!isAuth)
            return toast.error("Login First")
    if (!title.trim()) return toast.error("Title is required");
    if (!description.trim()) return toast.error("Description is required");

    try {
      await axios.post("https://todointern-1.onrender.com/api/todos/new", {
        title,
        description,
      });

      toast.success("Task added");
      setTitle("");
      setDescription("");
      fetchTodos();
    } catch {
      toast.error("Failed to add task");
    }
  };

  /* ================= OPEN EDIT MODAL ================= */
  const openEditModal = (todo) => {
    setEditId(todo._id);
    setEditTitle(todo.title);
    setEditDescription(todo.description || "");
    setOpen(true);
  };

  /* ================= UPDATE TODO ================= */
  const updateTodo = async () => {
    if (!editTitle.trim()) return toast.error("Title cannot be empty");

    try {
      await axios.put(
        `https://todointern-1.onrender.com/api/todos/edit/${editId}`,
        {
          title: editTitle,
          description: editDescription,
        }
      );

      toast.success("Todo updated");
      setOpen(false);
      fetchTodos();
    } catch {
      toast.error("Update failed");
    }
  };

  /* ================= DELETE TODO ================= */
  const deleteTodo = async (id) => {
    try {
      await axios.delete(
        `https://todointern-1.onrender.com/api/todos/delete/${id}`
      );
      toast.success("Task deleted");
      fetchTodos();
    } catch {
      toast.error("Delete failed");
    }
  };

  /* ================= TOGGLE STATUS ================= */
  const toggleStatus = async (id) => {
    try {
      await axios.patch(
        `https://todointern-1.onrender.com/api/todos/${id}/status`
      );
      fetchTodos();
    } catch {
      toast.error("Failed to update status");
    }
  };

  /* ================= LOGOUT ================= */
  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  useEffect(() => {
  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setMenuOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

  return (
    <div className="min-h-screen bg-[#0f172a] px-4">

      {/* ================= USER MENU ================= */}
      <div ref={menuRef} className="fixed top-6 right-6 z-50">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-gray-300 hover:text-white transition"
        >
          <FaUserCircle size={40} />
        </button>

        {menuOpen && (
          <div className="absolute right-0 mt-3 w-44 bg-[#020617] border border-gray-800 rounded-xl shadow-xl">
            <MenuItem
              icon={<FaSignOutAlt />}
              text="Sign Up"
              onClick={()=>{
                navigate('/signup')
              }}
            />
            <MenuItem
              icon={<FaSignOutAlt />}
              text="Sign In"
             onClick={()=>{
                navigate('/login')
              }}
            />
            <MenuItem
              icon={<FaSignOutAlt />}
              text="Logout"
              onClick={handleLogout}
            />
          </div>
          
        )}
      </div>

      {/* ================= TODO CARD ================= */}
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-xl bg-[#020617] rounded-2xl shadow-2xl p-6">

          <h1 className="text-2xl font-semibold text-center mb-6 text-white">
            Todo List
          </h1>

          {/* ADD TODO */}
          <div className="flex flex-col gap-3 mb-6">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Todo title..."
              className="bg-[#020617] border border-gray-700 rounded-xl px-4 py-2 text-gray-100"
            />

            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Todo description..."
              className="bg-[#020617] border border-gray-700 rounded-xl px-4 py-2 text-gray-100"
            />

            <button
              onClick={addTodo}
              className="bg-indigo-600 hover:bg-indigo-500 rounded-xl py-2 text-white flex items-center justify-center gap-2"
            >
              <FaPlus /> Add Todo
            </button>
          </div>

          {/* TODO LIST */}
          <div className="space-y-3 max-h-[320px] overflow-y-auto">
            {todos.map((todo) => (
              <div
                key={todo._id}
                className="bg-[#020617] border border-gray-800 rounded-xl px-4 py-3"
              >
                <div className="flex items-center justify-between">
                  <span
                    onClick={() => toggleStatus(todo._id)}
                    className={`flex items-center gap-2 cursor-pointer ${
                      todo.completed
                        ? "line-through text-gray-400"
                        : "text-gray-100"
                    }`}
                  >
                    <FaCheckCircle
                      className={
                        todo.completed ? "text-green-500" : "text-gray-600"
                      }
                    />
                    {todo.title}
                  </span>

                  <div className="flex gap-4">
                    <button
                      onClick={() => openEditModal(todo)}
                      className="text-blue-400 hover:text-blue-300"
                    >
                      <FaEdit />
                    </button>

                    <button
                      onClick={() => deleteTodo(todo._id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>

                {todo.description && (
                  <p className="mt-1 text-sm text-gray-400">
                    {todo.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= EDIT MODAL ================= */}
      {open && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-[#020617] w-full max-w-md rounded-2xl p-6 text-white">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Edit Todo</h2>
              <button onClick={() => setOpen(false)}>
                <FaTimes />
              </button>
            </div>

            <input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full mb-3 bg-[#0f172a] border border-gray-700 rounded-xl px-4 py-2"
            />

            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              rows={3}
              className="w-full bg-[#0f172a] border border-gray-700 rounded-xl px-4 py-2"
            />

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 rounded-xl bg-gray-700"
              >
                Close
              </button>

              <button
                onClick={updateTodo}
                className="px-4 py-2 rounded-xl bg-indigo-600"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ================= MENU ITEM ================= */
const MenuItem = ({ icon, text, onClick }) => (
  <button
    onClick={onClick}
    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-200 hover:bg-[#0f172a] cursor-pointer"
  >
    {icon}
    {text}
  </button>
);

export default Home;
