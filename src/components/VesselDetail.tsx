// src/components/VesselDetail.tsx
import React, { useState } from 'react';
import { Vessel } from '../types';
import IdentificationCard from './vessel/IdentificationCard';
import ContactCard from './vessel/ContactCard';
import VoyageCard from './vessel/VoyageCard';
import ControlPointsCard from './vessel/ControlPointsCard';
import DocumentsCard from './vessel/DocumentsCard';
import ChecklistCard from './vessel/ChecklistCard';
import { useAuth } from '../context/AuthContext';
import { useAppContext } from '../context/AppContext';

const VesselDetail: React.FC<{ vessel: Vessel }> = ({ vessel }) => {
  const { user } = useAuth();
  const { updateVessel } = useAppContext();

  const [showConfirm, setShowConfirm] = useState(false);
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleEdit = () => {
    // Flujo de edición futuro
    alert('Edit flow not implemented yet.');
  };

  const handleForceComplete = () => {
    setPassword('');
    setErrorMsg(null);
    setShowConfirm(true);
  };

  const confirmForceComplete = () => {
    if (!user) {
      setErrorMsg('You must be logged in.');
      return;
    }
    if (!password.trim()) {
      setErrorMsg('Enter your password.');
      return;
    }
    // En este demo validamos contra la password guardada en el usuario (AuthContext)
    const ok = (user as any).password && password === (user as any).password;
    if (!ok) {
      setErrorMsg('Invalid password.');
      return;
    }

    // Forzar finalización: poner ETA = ahora
    const updated: Vessel = {
      ...vessel,
      voyage: {
        ...vessel.voyage,
        eta: new Date().toISOString(),
      },
    };
    updateVessel(updated);
    setShowConfirm(false);
    alert('Voyage marked as completed.');
    // Si prefieres redirigir a Shipment Log, lo puedes hacer desde la página que usa este componente.
  };

  return (
    <div>
      {/* Header sin imagen, con botones a la derecha */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-100 leading-tight">
            {vessel.name}
          </h2>
          <p className="text-base md:text-lg text-slate-400">IMO: {vessel.id}</p>
        </div>

        <div className="mt-3 md:mt-0 flex gap-2">
          <button
            type="button"
            onClick={handleEdit}
            className="px-3 py-2 rounded-md border border-navy-700 bg-navy-800 hover:bg-navy-700 text-slate-100 text-sm"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={handleForceComplete}
            className="px-3 py-2 rounded-md border border-red-400 bg-red-500 hover:bg-red-400 text-navy-900 font-semibold text-sm"
          >
            Force complete
          </button>
        </div>
      </div>

      {/* Grid principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Columna izquierda */}
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <IdentificationCard vessel={vessel} />
            <ContactCard vessel={vessel} />
          </div>

          <VoyageCard vessel={vessel} />
          <ControlPointsCard vessel={vessel} />
        </div>

        {/* Columna derecha */}
        <div className="lg:col-span-1 space-y-4">
          <DocumentsCard vessel={vessel} />
          <ChecklistCard vessel={vessel} />
        </div>
      </div>

      {/* Modal confirmación */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="w-full max-w-sm bg-navy-800 border border-navy-700 rounded-xl p-4">
            <h3 className="text-slate-100 font-semibold text-lg mb-2">
              Confirm force completion
            </h3>
            <p className="text-slate-400 text-sm mb-3">
              To force-complete this voyage, please enter your password.
            </p>

            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setErrorMsg(null); }}
              placeholder="Your password"
              className="w-full rounded-md bg-navy-700 border border-navy-600 text-slate-100 px-3 py-2 mb-2 outline-none focus:ring-2 focus:ring-teal-400"
            />

            {errorMsg && <div className="text-red-400 text-sm mb-2">{errorMsg}</div>}

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowConfirm(false)}
                className="px-3 py-2 rounded-md border border-navy-700 bg-navy-800 hover:bg-navy-700 text-slate-100 text-sm"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmForceComplete}
                className="px-3 py-2 rounded-md border border-teal-400 bg-teal-500 hover:bg-teal-400 text-navy-900 font-semibold text-sm"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VesselDetail;