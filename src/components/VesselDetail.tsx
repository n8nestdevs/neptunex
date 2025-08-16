// src/components/VesselDetail.tsx
import React from 'react';
import { Vessel } from '../types';
import IdentificationCard from './vessel/IdentificationCard';
import ContactCard from './vessel/ContactCard';
import VoyageCard from './vessel/VoyageCard';
import ControlPointsCard from './vessel/ControlPointsCard';
import DocumentsCard from './vessel/DocumentsCard';
import ChecklistCard from './vessel/ChecklistCard';

const VesselDetail: React.FC<{ vessel: Vessel }> = ({ vessel }) => {
  return (
    <div>
      {/* Encabezado – más compacto */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-100 leading-tight">
            {vessel.name}
          </h2>
          <p className="text-base md:text-lg text-slate-400">IMO: {vessel.id}</p>
        </div>
        <img
          src={vessel.imageUrl}
          alt={vessel.name}
          className="mt-3 md:mt-0 w-full md:w-40 h-auto rounded-lg shadow-lg object-cover" // ← antes w-48
        />
      </div>

      {/* Grid principal – gaps más pequeños */}
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
    </div>
  );
};

export default VesselDetail;