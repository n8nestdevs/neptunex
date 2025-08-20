// src/pages/LoginPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      await login(email, password);
      navigate('/', { replace: true });
    } catch (e: any) {
      setErr(e?.message ?? 'Login error');
    } finally {
      setLoading(false);
    }
  };

  return (
    // Fondo a pantalla completa gris claro (no overlays, no imágenes)
    <div className="min-h-screen w-screen bg-gray-100 flex items-center justify-center px-4">
      {/* Card blanca */}
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-xl shadow-xl p-6">
        {/* Logo (asegúrate de poner el archivo en /public/frazer-logo.png) */}
        <div className="w-full flex justify-center mb-4">
          <img
            src="/frazer-logo.png"
            alt="FRAZEROIL"
            className="h-10 object-contain"
          />
        </div>

        <form onSubmit={onSubmit} className="space-y-3">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Email</label>
            <input
              type="email"
              className="w-full rounded-md bg-white border border-gray-300 px-3 py-2 text-gray-900 outline-none focus:ring-2 focus:ring-teal-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="super@neptuno.local"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Password</label>
            <input
              type="password"
              className="w-full rounded-md bg-white border border-gray-300 px-3 py-2 text-gray-900 outline-none focus:ring-2 focus:ring-teal-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

        {err && <p className="text-red-600 text-sm">{err}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-500 hover:bg-teal-400 disabled:opacity-60 text-white font-semibold rounded-md py-2 transition-colors"
          >
            {loading ? 'Signing in…' : 'LOGIN'}
          </button>
        </form>

        <p className="text-center text-xs text-gray-500 mt-3">
          Demo: <span className="font-mono">super@neptuno.local</span> / <span className="font-mono">admin12345</span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;