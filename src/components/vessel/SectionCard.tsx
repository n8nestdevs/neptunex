// src/components/vessel/SectionCard.tsx
import React from 'react';

type SectionCardProps = {
  title: string;
  icon?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
};

/**
 * Contenedor visual estándar de las tarjetas (bordes, colores, paddings).
 * Se exporta por DEFECTO.
 */
const SectionCard: React.FC<SectionCardProps> = ({ title, icon, className, children }) => {
  return (
    <div className={`bg-navy-800 rounded-lg shadow-lg p-6 border border-navy-700 ${className ?? ''}`}>
      <div className="flex items-center mb-4">
        {icon ? <div className="text-teal-400 mr-3">{icon}</div> : null}
        <h3 className="text-xl font-bold text-slate-200">{title}</h3>
      </div>
      {children}
    </div>
  );
};

type FieldProps = {
  label: string;
  value?: React.ReactNode;
  mono?: boolean;
  className?: string;
};

/**
 * Subcomponente para filas label/valor dentro de la tarjeta.
 * Se exporta con NOMBRE (entre llaves).
 */
export const Field: React.FC<FieldProps> = ({ label, value, mono, className }) => {
  return (
    <div className={className}>
      <p className="text-sm text-slate-400">{label}</p>
      <p className={`text-md text-slate-200 font-medium ${mono ? 'font-mono' : ''}`}>{value ?? '—'}</p>
    </div>
  );
};

export default SectionCard;