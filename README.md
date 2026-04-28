# Truck Load Optimization System 🚚

A full-stack logistics optimization platform with 3D visualization that simulates real-time truck loading based on constraints like weight, volume, and delivery sequence.

---

## 🌐 Live Demo

🔗 https://truck-optimizer.vercel.app/

---

## 🧠 Overview

This system enables users to upload SKU data (Excel/CSV), automatically generate optimized load plans, and visualize item placement inside a 3D truck container.

It solves real-world logistics problems by ensuring efficient space utilization and constraint-based loading.

---

## 🔗 Key Features

- 📦 3D truck loading visualization using Three.js  
- 📊 Real-time truck utilization analytics (weight & volume)  
- ⚙️ Constraint-based optimization (weight, volume, stacking rules)  
- 🔄 Excel/CSV data ingestion pipeline  
- 🚚 LIFO-based delivery sequence optimization  
- 📈 Gap analysis for unused space  
- 📤 Export load plan and reports  

---

## 🧠 Tech Stack

### Frontend
- React.js
- Three.js
- HTML, CSS

### Backend
- Node.js
- Express.js

### Database
- MongoDB

### Deployment
- Vercel (Frontend)

---

## 🏗️ Architecture

Frontend (React + Three.js)  
→ Backend (Express APIs)  
→ MongoDB (Data Storage)

---

## 📁 Project Structure


Truck-Optimizer/
│
├── frontend/ # React + Three.js visualization
├── backend/ # Express APIs and optimization logic
├── .gitignore
└── README.md


---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/yashveer-1/Truck-Optimizer.git
cd Truck-Optimizer

2. Install dependencies
Backend
cd backend
npm install

Frontend
cd ../frontend
npm install

3. Run the application
Start backend
cd backend
npm run dev

Start frontend
cd ../frontend
npm run dev

🔮 Future Improvements
FastAPI microservice for optimization logic
Docker containerization
CI/CD pipeline using GitHub Actions
Cloud deployment (GCP / Render)
Improved packing algorithm for higher efficiency

👨‍💻 Author

Yashveer Singh
BTech @ RVCE | Full Stack Developer
