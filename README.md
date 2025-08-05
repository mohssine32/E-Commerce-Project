# MERN E-commerce Project

This is a full-stack e-commerce project built with the MERN stack:
- **Frontend:** React
- **Backend:** Express.js & Node.js
- **Database:** MongoDB (can be local or cloud)
- **Others:** Docker support, environment variables management

---

## 📂 Project Structure
 /mon-projet/
├── frontend/ # React application
├── backend/ # Express backend API
├── docker-compose.yml # Docker configuration (optional)
├── Dockerfile # Dockerfile for backend or full app (optional)
├── .gitignore # Git ignore rules
└── README.md # This file

## 🚀 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo

cd backend
# Install dependencies
npm install

# Create a .env file (see example below)
cp .env.example .env

# Start the backend server
npm run dev

cd frontend
# Install dependencies
npm install

# Start the frontend development server
npm start