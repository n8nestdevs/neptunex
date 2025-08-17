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
    {/* Sidebar pegado a la izquierda; el contenido se centra con un max-width */}
    <div className="flex">
      <Sidebar />
      <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
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

            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </HashRouter>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;