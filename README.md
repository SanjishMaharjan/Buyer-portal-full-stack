# HomeHub - Real Estate Buyer Portal

A simple and modern **Buyer Portal** for a real estate broker where users can register, login, browse properties, and manage their **Favorites**.

Built with a clean separation between frontend and backend, secure authentication, and a lightweight database layer.

## ✨ Features

- **User Authentication**
  - Email + Password registration
  - Secure login with JWT
  - Passwords hashed with bcrypt
  - Protected routes (only logged-in users can access dashboard & favorites)

- **Buyer Dashboard**
  - Personalized greeting with user name
  - Overview of "My Home Hub"
  - Easy way to add/remove properties to favorites

- **My Favorites**
  - List all favorited properties
  - Add / Remove favorites with one click
  - Favorites are private (users can only see and modify their own)

- **Tech Stack**
  - **Frontend**: React + TypeScript + Tailwind CSS + React Router + Lucide Icons
  - **Backend**: Express.js + TypeScript + JWT
  - **Database**: PostgreSQL + Drizzle ORM
  - **Auth**: JWT (in-memory for development, easy to switch to DB sessions)
  - **Styling**: Tailwind CSS with custom design tokens (light + dark mode ready)


## 🚀 How to Run the Project

### 1. Prerequisites
- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- Git

### 2. Clone the Repository
```bash
git clone https://github.com/SanjishMaharjan/Buyer-portal-full-stack.git
cd Buyer-portal-full-stack

cd backend

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

PORT=5000
JWT_SECRET=your-super-secret-jwt-key-change-in-production
DATABASE_URL=postgresql://user:password@localhost:5432/homehub_db


## Run the backend
npm run dev
```

### 3. Start the Frontend
```bash
cd frontend
npm install
npm run dev
```

## 📝 Database Schema
The database schema is defined in the `backend/src/db/schema.ts` file.
Bash# Generate migrations (if schema changed)
npx drizzle-kit generate

# Push schema to database (development)
npx drizzle-kit push

# Or run migrations
npx drizzle-kit migrate