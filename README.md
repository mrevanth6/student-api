# Student Management System API

## 📌 Overview
This is a backend application for managing student data with secure authentication and role-based authorization.

## 🚀 Features
- User Signup & Login (JWT Authentication)
- Role-based access control (Admin & Student)
- Protected routes
- Profile management
- Admin CRUD operations
- Input validation & sanitization
- Pagination & search
- Rate limiting

---

## 🛠️ Tech Stack
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (jsonwebtoken)
- bcrypt
- express-validator

---

## ⚙️ Setup Instructions

1. Clone the repo
2. Install dependencies
3. Create `.env` file
4. Run server


---

## 🌐 API Endpoints

### Auth Routes
- POST /api/auth/register
- POST /api/auth/login

### Student Routes

- PATCH /api/student/updateProfile

### Admin Routes
- GET /api/student/profiles
- GET /api/student/profile/:id
- PUT /api/student/profile/update/:id"
- DELETE /api/student/profile/delete/:id

---

## 🧠 Student Model Fields

- name
- email
- password
- studentId
- course
- year
- gpa
- phone
- address
- emergencyContact
- role

---

## 🔐 Security Features

- Password hashing using bcrypt
- JWT-based authentication
- Protected routes middleware
- Role-based access control
- Input validation & sanitization

---
## 📌 Assumptions

- Students can update only personal details
- Admin has full control over student records
