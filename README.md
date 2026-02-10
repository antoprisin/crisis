# Blood Link - Crisis Management Platform

A comprehensive healthcare crisis management system with real-time tracking, AI assistance, and resource coordination.

## 🏗️ Project Structure

```
blood-link/
├── frontend/              # React + Vite frontend application
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Page components
│   │   ├── context/      # React context providers
│   │   ├── data/         # Static data and constants
│   │   └── App.jsx       # Main app component
│   ├── public/           # Static assets
│   ├── index.html        # HTML entry point
│   ├── vite.config.js    # Vite configuration
│   └── package.json      # Frontend dependencies
│
├── backend/              # Node.js + Express backend
│   ├── models/           # MongoDB models
│   ├── index.js          # Server entry point
│   ├── seed.js           # Database seeding script
│   ├── .env              # Environment variables
│   └── package.json      # Backend dependencies
│
├── package.json          # Root package for managing both
└── README.md             # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- MongoDB (optional, for database features)

### Installation

**Install all dependencies:**
```bash
npm run install:all
```

Or install separately:
```bash
# Frontend
cd frontend
npm install

# Backend
cd backend
npm install
```

### Development

Run both frontend and backend in **separate terminals**:

**Terminal 1 - Frontend (Port 5173):**
```bash
cd frontend
npm run dev
```

**Terminal 2 - Backend (Port 5000):**
```bash
cd backend
npm start
```

The app will be available at `http://localhost:5173`

### Environment Variables

**Frontend** (`frontend/.env`):
```env
VITE_API_URL=http://localhost:5000
```

**Backend** (`backend/.env`):
```env
GROQ_API_KEY=your_groq_api_key_here
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bloodlink
```

## 🌐 Deployment

### Frontend Deployment (Vercel/Netlify)

1. **Deploy the `frontend` folder**
2. **Build command:** `npm run build`
3. **Output directory:** `dist`
4. **Environment variables:** 
   - `VITE_API_URL` = Your backend URL

### Backend Deployment (Railway/Render/Heroku)

1. **Deploy the `backend` folder**
2. **Start command:** `npm start`
3. **Environment variables:**
   - `GROQ_API_KEY` = Your Groq API key
   - `MONGODB_URI` = Your MongoDB connection string
   - `PORT` = 5000 (or auto-assigned)

## 📦 Build for Production

**Frontend:**
```bash
cd frontend
npm run build
```

This creates an optimized production build in `frontend/dist/`

## 🔧 Features

- 🗺️ **Real-time Map Tracking** - Track blood banks, ambulances, and active requests
- 🤖 **AI Medical Assistant** - Groq-powered chatbot for first aid and medical guidance
- 🩸 **Blood Donation Management** - Request and donate blood with live coordination
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- 🌙 **Dark/Light Mode** - Theme switching support
- 🔔 **Real-time Notifications** - Stay updated on critical events

## 📝 License

Private - All Rights Reserved
