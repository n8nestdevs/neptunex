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
      setErr(e?.message ?? 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center">
      {/* Fondo a pantalla completa */}
      <div
        className="fixed inset-0 -z-20"
        style={{
          backgroundImage: 'url(/Neptuno.jpg)', // colocar la imagen en /public
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      {/* Oscurecedor */}
      <div className="fixed inset-0 bg-navy-900/70 -z-10" />

      {/* Card */}
      <div className="relative z-10 w-full max-w-md px-4">
        <div className="bg-navy-800/90 backdrop-blur rounded-xl border border-navy-700 p-6 shadow-xl">
          <h1 className="text-center text-2xl font-extrabold text-slate-100 mb-4">NEPTUNex</h1>

          <form onSubmit={onSubmit} className="space-y-3">
            <div>
              <label className="block text-sm text-slate-300 mb-1">Email</label>
              <input
                type="email"
                className="w-full rounded-md bg-navy-700 border border-navy-600 px-3 py-2 text-slate-100 outline-none focus:ring-2 focus:ring-teal-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="super@neptuno.local"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-slate-300 mb-1">Password</label>
              <input
                type="password"
                className="w-full rounded-md bg-navy-700 border border-navy-600 px-3 py-2 text-slate-100 outline-none focus:ring-2 focus:ring-teal-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            {err && <p className="text-red-400 text-sm">{err}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-teal-500 hover:bg-teal-400 disabled:opacity-60 text-navy-900 font-semibold rounded-md py-2 transition-colors"
            >
              {loading ? 'Ingresando…' : 'LOGIN'}
            </button>
          </form>

          <p className="text-center text-xs text-slate-400 mt-3">
            Acceso demo: <span className="font-mono">super@neptuno.local</span> / <span className="font-mono">admin12345</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;