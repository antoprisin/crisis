import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CrisisProvider, useCrisis } from './context/CrisisContext';
import Sidebar from './components/Sidebar';
import AIChatbot from './components/AIChatbot';
import ContactButtons from './components/ContactButtons';
import { motion, AnimatePresence } from 'framer-motion';

// Pages
import LoginPage from './pages/LoginPage';
import OnboardingPage from './pages/OnboardingPage';
import UserDashboard from './pages/UserDashboard';
import FoodPage from './pages/FoodPage';
import ShelterPage from './pages/ShelterPage';
import DoctorPage from './pages/DoctorPage';
import HealthCenterPage from './pages/HealthCenterPage';
import HospitalRequestPage from './pages/HospitalRequestPage';
import MedicinePage from './pages/MedicinePage';
import DonorDashboard from './pages/DonorDashboard';
import GlobalMapView from './pages/GlobalMapView';
import AboutPage from './pages/AboutPage';
import FAQPage from './pages/FAQPage';
import ProfilePage from './pages/ProfilePage';

const AppContent = () => {
  const { user, notifications, removeNotification } = useCrisis();

  return (
    <div className="app-layout">
      {user && (
        <div className="sidebar-wrapper" style={{ width: '280px', flexShrink: 0 }}>
          <Sidebar />
        </div>
      )}

      <div className={`main-content ${user ? 'with-sidebar' : ''}`} style={{ flex: 1, minHeight: '100vh', overflowY: 'auto' }}>
        <Suspense fallback={<div className="flex-center" style={{ height: '100vh', background: '#020617', color: 'white' }}>Initializing Neural Core...</div>}>
          <Routes>
            {/* Public Route */}
            <Route
              path="/login"
              element={user ? <Navigate to="/" replace /> : <LoginPage />}
            />

            {/* Authentication Guarded Routes */}
            <Route
              path="/"
              element={
                !user ? <Navigate to="/login" replace /> :
                  <Navigate to={user.role === 'donor' ? '/donor-dashboard' : '/dashboard'} replace />
              }
            />

            <Route
              path="/onboarding"
              element={user ? <OnboardingPage /> : <Navigate to="/login" replace />}
            />

            {/* Dashboard & Resources */}
            <Route
              path="/dashboard"
              element={user ? <UserDashboard /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/map"
              element={user ? <GlobalMapView /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/food"
              element={user ? <FoodPage /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/shelters"
              element={user ? <ShelterPage /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/doctors"
              element={user ? <DoctorPage /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/health-centers"
              element={user ? <HealthCenterPage /> : <Navigate to="/login" replace />}
            />

            {/* Hospital Portal */}
            <Route
              path="/hospital/blood"
              element={user ? <HospitalRequestPage type="blood" title="Blood Units" /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/hospital/supplies"
              element={user ? <HospitalRequestPage type="supplies" title="Protective Gear" /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/hospital/medicines/:category?"
              element={user ? <MedicinePage /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/hospital/equipment"
              element={user ? <HospitalRequestPage type="equipment" title="Medical Equipment" /> : <Navigate to="/login" replace />}
            />

            {/* Donor Portal */}
            <Route
              path="/donor-dashboard"
              element={user ? <DonorDashboard /> : <Navigate to="/login" replace />}
            />

            <Route
              path="/about"
              element={user ? <AboutPage /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/faq"
              element={user ? <FAQPage /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/profile"
              element={user ? <ProfilePage /> : <Navigate to="/login" replace />}
            />

            {/* 40 catch-all redirects to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </div>

      {/* AI Chatbot for authenticated users */}
      {user && <AIChatbot />}
      <ContactButtons />

      {/* Notifications overlay - high z-index */}
      <div style={{ position: 'fixed', top: '24px', right: '24px', zIndex: 10000, display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <AnimatePresence>
          {notifications.map(notif => (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.9 }}
              className="glass-card"
              style={{
                padding: '20px 24px',
                minWidth: '320px',
                borderLeft: `6px solid ${notif.type === 'error' ? '#ef4444' : notif.type === 'success' ? '#22c55e' : '#3b82f6'}`,
                background: 'var(--surface)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div>
                <div style={{ fontSize: '1rem', fontWeight: 900, marginBottom: '2px' }}>{notif.title}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>{notif.message}</div>
              </div>
              <button
                onClick={() => removeNotification(notif.id)}
                style={{ background: 'none', color: 'var(--text-muted)', fontSize: '1.4rem', padding: '0 0 0 20px', cursor: 'pointer', lineHeight: 1 }}
              >
                &times;
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <style>{`
        .sidebar-wrapper {
          height: 100vh;
          position: sticky;
          top: 0;
          z-index: 50;
        }
        .main-content.with-sidebar {
           padding-left: 0; /* Removing padding because wrapper handles it */
        }
      `}</style>
    </div>
  );
};

function App() {
  return (
    <Router>
      <CrisisProvider>
        <AppContent />
      </CrisisProvider>
    </Router>
  );
}

export default App;
