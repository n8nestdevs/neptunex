// src/App.tsx
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';

import Header from './components/Header';
import Sidebar from './components/Sidebar';

import HomePage from './pages/HomePage';
import TrackingPage from './pages/TrackingPage';
import ShipmentLogPage from './pages/ShipmentLogPage';
import DetailPage from './pages/DetailPage';
import NewVesselPage from './pages/NewVesselPage';
import LoginPage from './pages/LoginPage';
import SuperAdminPage from './pages/SuperAdminPage';

import { AppProvider } from './context/AppContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

const AppFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen bg-navy-900 text-slate-200 font-sans">
    <Header />
    <div className="flex">
      <Sidebar />
      {/* Max width fijo de escritorio + centrado */}
      <main className="flex-1 w-full max-w-[1440px] mx-auto p-4 sm:p-6 lg:p-8">
        {children}
      </main>
    </div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <HashRouter>
          <Routes>
            {/* Login / landing */}
            <Route
              path="/login"
              element={
                <div
                  className="relative min-h-screen w-full flex items-center justify-center"
                  style={{
                    backgroundImage: 'url(/neptuno-login-bg.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                  }}
                >
                  <div className="absolute inset-0 bg-navy-900/50 pointer-events-none" />
                  <div className="relative z-10 w-full max-w-md">
                    <LoginPage />
                  </div>
                </div>
              }
            />

            {/* Home */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <AppFrame>
                    <HomePage />
                  </AppFrame>
                </ProtectedRoute>
              }
            />

            {/* Tracking */}
            <Route
              path="/tracking"
              element={
                <ProtectedRoute>
                  <AppFrame>
                    <TrackingPage />
                  </AppFrame>
                </ProtectedRoute>
              }
            />

            {/* Shipment Log */}
            <Route
              path="/shipment-log"
              element={
                <ProtectedRoute>
                  <AppFrame>
                    <ShipmentLogPage />
                  </AppFrame>
                </ProtectedRoute>
              }
            />

            {/* New vessel (Admin / SuperAdmin) */}
            <Route
              path="/vessel/new"
              element={
                <ProtectedRoute roles={['Admin', 'SuperAdmin']}>
                  <AppFrame>
                    <NewVesselPage />
                  </AppFrame>
                </ProtectedRoute>
              }
            />

            {/* Vessel detail */}
            <Route
              path="/vessel/:vesselId"
              element={
                <ProtectedRoute>
                  <AppFrame>
                    <DetailPage />
                  </AppFrame>
                </ProtectedRoute>
              }
            />

            {/* SuperAdmin — single user management page */}
            <Route
              path="/superadmin"
              element={
                <ProtectedRoute roles={['SuperAdmin']}>
                  <AppFrame>
                    <SuperAdminPage />
                  </AppFrame>
                </ProtectedRoute>
              }
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </HashRouter>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;