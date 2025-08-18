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

  // Altura máxima del card del mapa: 100vh - header(56px) - margen superior aprox (64px)
  // Ajusta "64" si necesitas afinar  (40–80 suele quedar bien según tu padding/espaciados).
  const MAP_CARD_MAX_HEIGHT = 'calc(100vh - 56px - 64px)';

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-100">Dashboard</h1>

      {/* Mantengo tu layout EXACTO (KPI a la izquierda, mapa a la derecha) */}
      <div className="grid gap-6 lg:grid-cols-[320px_minmax(900px,1fr)] items-start">
        {/* KPIs (sin cambios) */}
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

        {/* MAPA — solo limitamos altura y evitamos overflow */}
        <div className="justify-self-end w-full max-w-[1500px]">
          <div
            className="bg-navy-800 rounded-lg border border-navy-700 p-3 overflow-hidden"
            style={{ maxHeight: MAP_CARD_MAX_HEIGHT }}
          >
            <div className="text-slate-300 font-medium mb-2">Fleet map</div>

            {/* Este contenedor ocupa todo lo que quede dentro del card */}
            <div className="w-full" style={{ height: 'calc(100% - 28px)' }}>
              {/* IMPORTANTE: el mapa llena su contenedor, sin altura fija */}
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