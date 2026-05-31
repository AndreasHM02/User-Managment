# User Management System

Full-stack user management system built with ASP.NET Core (.NET 10) and React (Vite).

The project demonstrates authentication, role-based authorization, and CRUD operations using a clean layered backend architecture similar to real-world systems.

---

## 🧰 Tech Stack

**Backend**
- ASP.NET Core Web API (.NET 10)
- Entity Framework Core (SQLite)
- JWT Authentication
- Serilog (logging)
- Swagger / OpenAPI

**Frontend**
- React (Vite) + TypeScript
- Axios
- React Router DOM

---

## ✨ Features

- User registration and login
- JWT-based authentication
- Role-based authorization (Admin / User)
- User profile management
- Admin dashboard for managing users (CRUD)
- Secure frontend and backend routes
- Clean layered backend architecture

---

## 🏗 Architecture

The backend follows a layered architecture:

- **API** → Controllers and HTTP endpoints
- **Application** → Business logic and services
- **Domain** → Core models and enums
- **Infrastructure** → Database access and EF Core

Frontend structure:
- Pages for authentication, profile, and admin
- Reusable UI components
- Auth context for managing user session and token state
- API layer for backend communication

---

## 🧠 Purpose

This project was built to gain practical experience with full-stack development, authentication flows, and scalable backend architecture using modern web technologies.

---

## ▶️ How to run

### Backend
```bash
cd ApiApp
dotnet restore
dotnet ef database update
dotnet run
```
Backend runs on: http://localhost:5036 (or configured port)

### Frontend
```bash
cd client
npm install
npm run dev
```
Frontend runs on: http://localhost:5173

---

## 👤 Author

Andreas
