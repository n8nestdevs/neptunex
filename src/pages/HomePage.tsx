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
    { label: 'Total vessels',    value: total,    icon: <ShipIcon className="w-5 h-5 text-teal-400" /> },
    { label: 'With data (mock)', value: withData, icon: <DatabaseIcon className="w-5 h-5 text-blue-400" /> },
    { label: 'Open alerts',      value: openAlerts, icon: <AlertTriangleIcon className="w-5 h-5 text-red-400" /> },
  ];

  const markers: MarkerData[] = useMemo(
    () =>
      vessels
        .filter(v => !!v.position)
        .map(v => ({
          id: v.id,
          name: v.name,
          lat: v.position!.lat,
          lon: v.position!.lon,
          sog: v.position!.sog,
          cog: v.position!.cog,
        })),
    [vessels]
  );

  return (
    // Forzamos a que el contenido ocupe el alto de la ventana menos el header (56px)
    <div className="min-h-[calc(100vh-56px)] flex flex-col">
      {/* Título compacto */}
      <h1 className="text-2xl font-bold text-slate-100 mb-3">Dashboard</h1>

      {/* Zona principal: 2 columnas — KPIs (ancho fijo) + mapa (crece y ocupa toda la altura) */}
      <div className="grid gap-4 lg:grid-cols-[220px_minmax(900px,1fr)] flex-1 min-h-0">
        {/* Columna izquierda: KPIs en pila, todas iguales */}
        <div className="grid grid-cols-1 gap-3">
          {kpis.map((kpi, i) => (
            <div
              key={i}
              className="bg-navy-800 h-24 w-full p-3 rounded-lg border border-navy-700 flex items-center gap-3 hover:border-teal-400 transition-colors"
            >
              <div className="flex-shrink-0">{kpi.icon}</div>
              <div>
                <div className="text-slate-400 text-xs">{kpi.label}</div>
                <div className="text-2xl font-semibold text-slate-100 leading-tight">{kpi.value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Columna derecha: tarjeta del mapa que ocupa toda la altura disponible */}
        <div className="flex flex-col min-h-0">
          <div className="bg-navy-800 rounded-lg border border-navy-700 p-3 flex-1 min-h-0 overflow-hidden">
            <div className="text-slate-300 font-medium mb-2">Fleet map</div>
            {/* El contenedor del mapa se estira al 100% de la tarjeta */}
            <div className="w-full h-full rounded-lg overflow-hidden">
              <MapView markers={markers} height="100%" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;