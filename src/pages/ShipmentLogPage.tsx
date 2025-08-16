// src/pages/ShipmentLogPage.tsx
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { initialVessels } from '../data/mockData';
import type { Vessel } from '../types';

const ShipmentLogPage: React.FC = () => {
  const items: Vessel[] = useMemo(() => {
    const now = Date.now();
    return [...initialVessels]
      .filter(v => new Date(v.voyage.eta).getTime() < now)
      .sort((a, b) => new Date(b.voyage.eta).getTime() - new Date(a.voyage.eta).getTime());
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-100">Shipment Log</h1>

      <div className="bg-navy-800/60 border border-navy-700 rounded-lg">
        {/* Header de la “ventana” */}
        <div className="px-4 py-3 border-b border-navy-700">
          <div className="text-slate-300 text-sm">
            {items.length > 0 ? `${items.length} completed shipments` : 'No completed shipments.'}
          </div>
        </div>

        {/* Contenido scrolleable */}
        <div className="max-h-[70vh] overflow-y-auto">
          {items.length > 0 && (
            <ul className="divide-y divide-navy-700">
              {items.map((v) => {
                const etdStr = new Date(v.voyage.etd).toLocaleString();
                const etaStr = new Date(v.voyage.eta).toLocaleString();

                return (
                  <li key={v.id} className="hover:bg-navy-700/40 transition-colors">
                    <Link to={`/vessel/${v.id}`} className="block px-4 py-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:items-center">
                        {/* Col 1 */}
                        <div>
                          <div className="text-slate-100 font-semibold">{v.name}</div>
                          <div className="text-slate-400 text-sm mt-1">
                            {v.id} · {v.flag}
                          </div>
                        </div>

                        {/* Col 2 */}
                        <div className="text-slate-300">
                          <div className="text-sm">
                            {v.voyage.departurePort}{' '}
                            <span className="text-slate-500">→</span>{' '}
                            {v.voyage.destinationPort}
                          </div>
                          <div className="text-slate-500 text-xs mt-1">
                            ETD: {etdStr} · ETA: {etaStr}
                          </div>
                        </div>

                        {/* Col 3 */}
                        <div className="md:text-right">
                          <span className="inline-block bg-green-600 text-white text-xs font-bold px-2 py-0.5 rounded">
                            COMPLETED
                          </span>
                          <div className="text-slate-400 text-xs mt-1">
                            at <span className="text-slate-300 font-medium">ETA</span> ({etaStr})
                          </div>
                        </div>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShipmentLogPage;