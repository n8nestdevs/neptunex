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
    { label: 'Total vessels', value: total, icon: <ShipIcon className="w-5 h-5 text-teal-400" /> },
    { label: 'With data (mock)', value: withData, icon: <DatabaseIcon className="w-5 h-5 text-blue-400" /> },
    { label: 'Open alerts', value: openAlerts, icon: <AlertTriangleIcon className="w-5 h-5 text-red-400" /> },
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

  // Altura del contenedor de mapa para evitar scroll vertical y alinear con sidebar
  const MAP_HEIGHT = 'calc(100vh - 56px - 40px)'; // 56 header, 40 padding/márgenes

  return (
    <div className="space-y-3 overflow-hidden">
      {/* Título más compacto */}
      <h1 className="text-2xl lg:text-3xl font-bold text-slate-100 leading-tight">Dashboard</h1>

      <div className="grid gap-4 lg:grid-cols-[220px_minmax(900px,1fr)] items-start">
        {/* KPIs en columna; todas iguales */}
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

        {/* Mapa alineado al top, sin sobrepasar el header ni la parte inferior del sidebar */}
        <div className="justify-self-end w-full max-w-[1500px]">
          <div
            className="bg-navy-800 rounded-lg border border-navy-700 p-3 overflow-hidden relative"
            style={{ height: MAP_HEIGHT }}
          >
            <div className="text-slate-300 font-medium mb-2">Fleet map</div>
            <div className="h-[calc(100%-32px)]">
              <MapView markers={markers} height="100%" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;