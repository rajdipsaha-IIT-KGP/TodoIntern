const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { connectDB } = require("./database/db");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://todo-intern-ten.vercel.app",
    ],
    credentials: true,
  })
);


app.use(cookieParser());

const authRoutes = require("./routes/authRoutes");
const todoRoutes = require("./routes/todoRoutes");
app.use("/api/auth", authRoutes);
app.use("/api/todos",todoRoutes)

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await connectDB();
});
