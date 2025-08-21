// src/pages/TrackingPage.tsx
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import type { Vessel } from '../types';
import { initialVessels } from '../data/mockData';

const TrackingPage: React.FC = () => {
  const now = Date.now();

  // Consideramos "forzado/completado" si el objeto trae estas marcas opcionales
  const isCompleted = (v: Vessel) =>
    (v as any).forceCompleted === true || Boolean((v as any).completedAt);

  // Activo = ETA en el futuro y no completado/forzado
  const vessels: Vessel[] = useMemo(() => {
    return initialVessels.filter(v => {
      const eta = new Date(v.voyage.eta).getTime();
      return eta >= now && !isCompleted(v);
    });
  }, [now]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-100">Tracking</h1>

      {vessels.length === 0 ? (
        <div className="text-slate-400">No active shipments.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {vessels.map((v) => (
            <Link
              key={v.id}
              to={`/vessel/${v.id}`}
              className="bg-navy-800 rounded-lg shadow-lg border border-navy-700 hover:bg-navy-700 transition-colors"
            >
              <div className="p-4">
                <div className="text-slate-100 font-semibold">{v.name}</div>
                <div className="text-slate-400 text-sm mt-1">
                  {v.id} · {v.flag}
                </div>
                <div className="text-slate-400 text-sm mt-2">
                  {v.voyage.departurePort} → {v.voyage.destinationPort}
                </div>
                <div className="text-slate-500 text-xs mt-1">
                  ETD: {new Date(v.voyage.etd).toLocaleString()} · ETA:{' '}
                  {new Date(v.voyage.eta).toLocaleString()}
                </div>
              </div>
            </Link>
          ))}

          {/* “+” add vessel card */}
          <Link
            to="/vessel/new"
            className="flex items-center justify-center bg-navy-800 rounded-lg shadow-lg border border-dashed border-teal-400 hover:bg-navy-700 transition-all"
            aria-label="Add new vessel"
          >
            <span className="text-5xl leading-none text-teal-400">+</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default TrackingPage;