# 📝 TodoList

A **full-stack Todo application** built using the **MERN stack**, featuring secure authentication, task management, and a modern UI.  
This project was developed as part of an internship-level full-stack application.

---

## 🌐 Live Demo

🔗 **Frontend (Vercel)**  
https://vercel.com/rajdip-sahas-projects/todo-intern

---

## 🚀 Features

- 🔐 User Authentication (JWT + HTTP-only Cookies)
- 🧾 Create, Read, Update, Delete Todos
- ✅ Mark todos as completed / incomplete
- 📊 Circular progress indicator for completed tasks
- ✏️ Edit todo using modal
- 🔒 Protected routes
- 🍪 Secure cookie-based auth
- 🎨 Modern dark UI
- 📱 Responsive design

---

## 🛠️ Tech Stack

### Frontend
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-671ddf?style=for-the-badge&logo=axios&logoColor=white)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node-dot-js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=jsonwebtokens)

---

## 📂 Project Structure

TodoIntern/
│
├── backend/
│ ├── controllers/
│ ├── routes/
│ ├── models/
│ ├── middlewares/
│ ├── utils/
│ └── index.js
│
├── frontend/
│ ├── src/
│ ├── public/
│ └── vite.config.js
│
└── README.md

---

## 🔐 Authentication Flow

- User logs in / registers
- JWT token is stored in **HTTP-only cookie**
- Protected routes validate token via middleware
- Frontend checks authentication using `AuthContext`

---

## 🔁 API Endpoints (Backend)

### Auth
POST /api/auth/register
POST /api/auth/login
GET /api/auth/logout

### Todos
GET /api/todos/all
POST /api/todos/new
PUT /api/todos/:id
PATCH /api/todos/:id/status
DELETE /api/todos/:id


---

## ⚙️ Local Setup


###  1️⃣ Clone Repository



git clone https://github.com/rajdipsaha-IIT-KGP/TodoIntern.git
cd TodoIntern

### 2️⃣ Backend Setup

cd backend
npm install
npm start

### 3️⃣ Frontend Setup
cd frontend
npm install
npm run dev


### 🚀 Deployment

Frontend deployed on Vercel

Backend deployed on Render

Uses secure cookies with CORS enabled

### 👨‍💻 Author

Rajdip Saha
IIT Kharagpur
Full-Stack Developer

🔗 GitHub: https://github.com/rajdipsaha-IIT-KGP




