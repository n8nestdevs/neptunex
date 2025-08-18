// src/pages/HomePage.tsx
import React, { useMemo } from 'react';
import { initialVessels } from '../data/mockData';
import type { Vessel } from '../types';
import MapView, { type MarkerData } from '../components/MapView';
import { ShipIcon, DatabaseIcon, AlertTriangleIcon } from '../components/Icons';

const HomePage: React.FC = () => {
  const vessels: Vessel[] = useMemo(() => initialVessels, []);

  const total = vessels.length;
  const withData = vessels.length;
  const openAlerts = 0;

  const kpis = [
    { label: 'Total vessels', value: total, icon: <ShipIcon className="w-6 h-6 text-teal-400" /> },
    { label: 'With data (mock)', value: withData, icon: <DatabaseIcon className="w-6 h-6 text-blue-400" /> },
    { label: 'Open alerts', value: openAlerts, icon: <AlertTriangleIcon className="w-6 h-6 text-red-400" /> },
  ];

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

  // Altura del card del mapa (ajusta 64px si necesitas afinar)
  const MAP_CARD_HEIGHT = 'calc(100vh - 56px - 60px)';

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-100">Dashboard</h1>

      {/* Izq fija 320px (KPI), der ocupa el resto sin mínimo para evitar overflow */}
      <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)] items-start">
        {/* KPI (sin cambios) */}
        <div className="space-y-4">
          {kpis.map((kpi, i) => (
            <div
              key={i}
              className="bg-navy-800 p-4 rounded-lg border border-navy-700 flex items-center gap-4 hover:border-teal-400 transition-colors"
            >
              <div className="flex-shrink-0">{kpi.icon}</div>
              <div>
                <div className="text-slate-400 text-sm">{kpi.label}</div>
                <div className="text-3xl font-semibold text-slate-100">{kpi.value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Mapa: sin max-width, con min-w-0 para que no haga overflow */}
        <div className="justify-self-stretch w-full min-w-0">
          <div
            className="bg-navy-800 rounded-lg border border-navy-700 p-3 overflow-hidden min-w-0"
            style={{ height: MAP_CARD_HEIGHT, maxHeight: MAP_CARD_HEIGHT }}
          >
            <div className="text-slate-300 font-medium mb-2">Fleet map</div>
            <div className="w-full" style={{ height: 'calc(100% - 28px)' }}>
              <MapView markers={markers} height="100%" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;