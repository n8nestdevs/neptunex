// src/pages/NewVesselPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NewVesselPage: React.FC = () => {
  const navigate = useNavigate();
  const [imo, setImo] = useState('');
  const [name, setName] = useState('');
  const [flag, setFlag] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Por ahora solo validamos que no esté vacío y volvemos a tracking.
    if (!imo || !name || !flag) return;
    navigate('/tracking');
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-slate-100">Add New Vessel</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
        {/* Columna izquierda (form) */}
        <div className="lg:col-span-2">
          <div className="bg-navy-800/60 border border-navy-700 rounded-xl p-4 space-y-4">
            <div>
              <label className="block text-slate-300 text-sm mb-1">IMO *</label>
              <input
                value={imo}
                onChange={e => setImo(e.target.value)}
                placeholder="IMO9334567"
                className="w-full p-2 rounded bg-navy-900 border border-navy-700 text-slate-100"
                required
              />
            </div>
            <div>
              <label className="block text-slate-300 text-sm mb-1">Name *</label>
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Andromeda Voyager"
                className="w-full p-2 rounded bg-navy-900 border border-navy-700 text-slate-100"
                required
              />
            </div>
            <div>
              <label className="block text-slate-300 text-sm mb-1">Flag *</label>
              <input
                value={flag}
                onChange={e => setFlag(e.target.value)}
                placeholder="Panama"
                className="w-full p-2 rounded bg-navy-900 border border-navy-700 text-slate-100"
                required
              />
            </div>

            <div className="pt-1">
              <button
                type="submit"
                className="bg-teal-500 hover:bg-teal-400 text-navy-900 font-semibold px-4 py-2 rounded-md border border-teal-400"
              >
                Save
              </button>
            </div>
          </div>
        </div>

        {/* Columna derecha (placeholder mientras re‑conectamos los panels) */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-navy-800/60 border border-navy-700 rounded-xl p-4">
            <div className="text-slate-300 font-medium mb-2">Documentation</div>
            <div className="text-slate-500 text-sm">Coming soon…</div>
          </div>
          <div className="bg-navy-800/60 border border-navy-700 rounded-xl p-4">
            <div className="text-slate-300 font-medium mb-2">Checklist</div>
            <div className="text-slate-500 text-sm">Coming soon…</div>
          </div>
          <div className="bg-navy-800/60 border border-navy-700 rounded-xl p-4">
            <div className="text-slate-300 font-medium mb-2">Notifications</div>
            <div className="text-slate-500 text-sm">Coming soon…</div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewVesselPage;