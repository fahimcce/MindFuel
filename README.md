# 🧠 MINDFUEL - Minimal LMS System 
### Developed a Learning Management System (LMS) with two main panels: 
   ● Admin Dashboard (for course content management) 
   ● User Panel (for course consumption and progress tracking) 

MINDFUEL is an advanced e-learning platform built with:

- **Frontend**: Next.js, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express, MongoDB,mongoose(ODM)
- **Authentication**: JWT, Bcrypt

The platform offers project-based courses with cognitive science principles to maximize learning retention.

---

## 📁 Project Structure

mindfuel/
├── client/ # Frontend (Next.js)
└── server/ # Backend (Node+Express + MongoDB)

---


---

## ⚙️ Prerequisites

Before you begin, ensure you have installed:

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or local MongoDB
- [Git](https://git-scm.com/)

---

## 🚀 Quick Start

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/mindfuel.git](https://github.com/fahimcce/MindFuel.git)
cd mindfuel
```
### 2️⃣  Install Dependencies
#### Backend (Server)
```bash
cd mindfuel-server
npm install
```
#### Frontend (Client)
```bash
cd /mindfuel
npm install
```
### 3️⃣ Environment Variables Setup
#### 📄 Backend (mindfuel-server/.env)
##### Create a .env file in server folder root directory and paste the following:
```bash
NODE_ENV=
PORT=
DATABASE_URL=
BCRYPT_SALT_ROUNDS=

JWT_ACCESS_TOKEN=
JWT_ACCESS_EXPIRE_IN=

JWT_REFRESH_TOKEN=
JWT_REFRESH_EXPIRES_IN=
```
#### 📄 Frontend (mindfuel/.env.local)
##### Create a .env.local file in client folder root directory and paste:
```bash
NEXT_PUBLIC_BASE_API=for server URL please email me at fahimcce@gmail.com
NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY=
NEXT_PUBLIC_Cloud_Name=
NEXT_PUBLIC_Api_Key=
NEXT_PUBLIC_Api_Secret=
NEXT_PUBLIC_UpLoad_preset=
```
### 4️⃣ Run the Application Locally
#### Start the Server
```bash
cd mindfuel-server
npm run dev
```
#### Start the Client
##### In a new terminal:
```bash
cd mindfuel
npm run dev
Now open your browser and go to: http://localhost:3000
```

### 💡 Notes

1. Always run the backend first before starting the frontend.  
2. Ensure your environment variables are correct. 


