# Deployment Guide for Blood Link

## 🚀 Backend Deployment (Render)

### Step 1: Prepare Backend
1. Make sure you have a MongoDB Atlas account (free tier works)
   - Go to https://www.mongodb.com/cloud/atlas
   - Create a free cluster
   - Get your connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/bloodlink`)

### Step 2: Deploy to Render
1. Go to https://render.com and sign up/login
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure:
   - **Name**: `blood-link-backend` (or any name)
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

5. Add Environment Variables:
   ```
   GROQ_API_KEY=your_groq_api_key_here
   MONGODB_URI=your_mongodb_atlas_connection_string_here
   PORT=5000
   NODE_ENV=production
   ```

6. Click **"Create Web Service"**
7. Wait for deployment (5-10 minutes)
8. **Copy your backend URL** (e.g., `https://blood-link-backend.onrender.com`)

---

## 🌐 Frontend Deployment (Vercel)

### Step 1: Update Environment Variable
1. Open `frontend/.env.production`
2. Replace with your actual Render backend URL:
   ```
   VITE_API_URL=https://your-backend-app.onrender.com
   ```

### Step 2: Deploy to Vercel
1. Go to https://vercel.com and sign up/login
2. Click **"Add New"** → **"Project"**
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

5. Add Environment Variable:
   - Key: `VITE_API_URL`
   - Value: `https://your-backend-app.onrender.com` (your Render URL)

6. Click **"Deploy"**
7. Wait for deployment (2-5 minutes)
8. Your site will be live at `https://your-project.vercel.app`

---

## ✅ Post-Deployment Checklist

- [ ] Backend is running on Render
- [ ] MongoDB Atlas is connected
- [ ] Frontend environment variable points to correct backend URL
- [ ] Test the chatbot (AI features)
- [ ] Test the map (resource loading)
- [ ] Test login/signup flow

---

## 🔧 Troubleshooting

### Backend Issues
- **500 Error**: Check MongoDB connection string in Render environment variables
- **CORS Error**: Backend already has CORS enabled, but verify it's running
- **Chatbot not working**: Verify GROQ_API_KEY is set correctly

### Frontend Issues
- **Blank page**: Check browser console for errors
- **API calls failing**: Verify VITE_API_URL is set correctly in Vercel
- **Build fails**: Run `npm run build` locally first to catch errors

---

## 📝 Important Notes

1. **Free Tier Limitations**:
   - Render free tier: Backend sleeps after 15 min of inactivity (first request takes ~30s to wake)
   - MongoDB Atlas free tier: 512MB storage limit
   - Vercel free tier: Unlimited bandwidth for personal projects

2. **Custom Domain** (Optional):
   - In Vercel: Settings → Domains → Add your domain
   - In Render: Settings → Custom Domain

3. **Environment Variables**:
   - Never commit `.env` files to Git
   - Always use platform-specific environment variable settings
