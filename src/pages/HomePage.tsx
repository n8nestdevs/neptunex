// src/pages/HomePage.tsx
import React, { useMemo } from 'react';
import { initialVessels } from '../data/mockData';
import type { Vessel } from '../types';
import MapView, { type MarkerData } from '../components/MapView';
import { ShipIcon, DatabaseIcon, AlertTriangleIcon } from '../components/Icons';

const HomePage: React.FC = () => {
  // Local mock data with position already included
  const vessels: Vessel[] = useMemo(() => initialVessels, []);

  // KPIs (mock)
  const total = vessels.length;
  const withData = vessels.length;
  const openAlerts = 0;

  const kpis = [
    { label: 'Total vessels', value: total, icon: <ShipIcon className="w-5 h-5 text-teal-400" /> },
    { label: 'With data (mock)', value: withData, icon: <DatabaseIcon className="w-5 h-5 text-blue-400" /> },
    { label: 'Open alerts', value: openAlerts, icon: <AlertTriangleIcon className="w-5 h-5 text-red-400" /> },
  ];

  // Markers from vessel.position (if exists)
  const markers: MarkerData[] = useMemo(() => {
    return vessels
      .filter(v => !!v.position)
      .map(v => ({
        id: v.id,
        name: v.name,
        lat: v.position!.lat,
        lon: v.position!.lon,
        sog: v.position!.sog,
        cog: v.position!.cog,
      }));
  }, [vessels]);

  const MAP_HEIGHT = 'calc(100vh - 56px - 48px)';

  return (
    <div className="space-y-4 overflow-hidden">
      <h1 className="text-xl font-bold text-slate-100">Dashboard</h1>

      <div className="grid gap-4 lg:grid-cols-[300px_minmax(900px,1fr)] items-start">
        {/* LEFT COLUMN (KPIs en 2 columnas) */}
        <div className="grid grid-cols-2 gap-3">
          {kpis.map((kpi, i) => (
            <div
              key={i}
              className="bg-navy-800 p-3 rounded-lg border border-navy-700 flex items-center gap-3 hover:border-teal-400 transition-colors"
            >
              <div className="flex-shrink-0">{kpi.icon}</div>
              <div>
                <div className="text-slate-400 text-xs">{kpi.label}</div>
                <div className="text-2xl font-semibold text-slate-100 leading-tight">{kpi.value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT COLUMN (MAP) */}
        <div className="justify-self-end w-full max-w-[1500px]">
          <div
            className="bg-navy-800 rounded-lg border border-navy-700 p-3 overflow-hidden relative"
            style={{ height: MAP_HEIGHT }}
          >
            <div className="text-slate-300 font-medium mb-2">Fleet map</div>
            <div className="h-[calc(100%-32px)]">
              <MapView markers={markers} height="100%" />
            </div>
            {markers.length === 0 && (
              <div className="text-slate-500 text-xs mt-2">
                No positions yet. Default global view is shown.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;