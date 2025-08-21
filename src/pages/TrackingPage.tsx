import React, { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { Vessel } from '../types';
import { initialVessels } from '../data/mockData';

const AddVesselCard: React.FC = () => {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      onClick={() => navigate('/vessel/new')}
      className="w-full h-full flex items-center justify-center bg-navy-800 rounded-lg shadow-lg border border-dashed border-teal-400 hover:bg-navy-700 transition-all outline-none focus:outline-none focus:ring-0 select-none"
      aria-label="Add new vessel"
    >
      <span className="text-5xl leading-none text-teal-400">+</span>
    </button>
  );
};

const TrackingPage: React.FC = () => {
  const vessels: Vessel[] = useMemo(() => initialVessels, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-100">Tracking</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {vessels.map((v) => (
          <Link
            key={v.id}
            to={`/vessel/${v.id}`}
            className="bg-navy-800 rounded-lg shadow-lg border border-navy-700 hover:bg-navy-700 transition-colors outline-none focus:outline-none"
          >
            <div className="p-4">
              <div className="text-slate-100 font-semibold">{v.name}</div>
              <div className="text-slate-400 text-sm mt-1">{v.id} · {v.flag}</div>
              <div className="text-slate-400 text-sm mt-2">
                {v.voyage.departurePort} → {v.voyage.destinationPort}
              </div>
              <div className="text-slate-500 text-xs mt-1">
                ETD: {new Date(v.voyage.etd).toLocaleString()} · ETA: {new Date(v.voyage.eta).toLocaleString()}
              </div>
            </div>
          </Link>
        ))}

        {/* Card “+” como botón (sin anillo azul) */}
        <div className="rounded-lg shadow-lg">
          <AddVesselCard />
        </div>
      </div>
    </div>
  );
};

export default TrackingPage;