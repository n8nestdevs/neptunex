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
import CheckpointsAlertsPage from './pages/CheckpointsAlertsPage'; // ⬅️ NUEVO

import { AppProvider } from './context/AppContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

const AppFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen bg-navy-900 text-slate-200 font-sans">
    <Header />
    <div className="flex">
      <Sidebar />
      {/* Menos padding arriba para alinear con el primer item del sidebar */}
      <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-3 pb-4">
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
            {/* Login limpio, sin wrappers ni fondos extra */}
            <Route path="/login" element={<LoginPage />} />

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
              path="/checkpoints"
              element={
                <ProtectedRoute>
                  <AppFrame>
                    <CheckpointsAlertsPage />
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