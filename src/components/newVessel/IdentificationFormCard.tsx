// src/components/newVessel/IdentificationFormCard.tsx
import React from 'react';
import SectionCard from '../vessel/SectionCard'; // reutilizamos el mismo estilo de tarjeta
import { IdentificationIcon } from '../Icons'; // usa el icono que tengas; si no, reemplázalo por cualquiera

export type IdentificationFormState = {
  id: string;
  name: string;
  flag: string;
};

type Props = {
  value: IdentificationFormState & Record<string, any>;
  onChange: (patch: Partial<IdentificationFormState>) => void;
};

const IdentificationFormCard: React.FC<Props> = ({ value, onChange }) => {
  return (
    <SectionCard title="Identification" icon={<IdentificationIcon className="w-6 h-6" />}>
      <div className="space-y-3">
        <div>
          <label className="block text-slate-300 text-sm mb-1">IMO *</label>
          <input
            value={value.id}
            onChange={(e) => onChange({ id: e.target.value })}
            className="w-full p-2 rounded bg-navy-800 border border-navy-700 text-slate-200"
            placeholder="IMO9334567"
            required
          />
        </div>
        <div>
          <label className="block text-slate-300 text-sm mb-1">Vessel Name *</label>
          <input
            value={value.name}
            onChange={(e) => onChange({ name: e.target.value })}
            className="w-full p-2 rounded bg-navy-800 border border-navy-700 text-slate-200"
            placeholder="Andromeda Voyager"
            required
          />
        </div>
        <div>
          <label className="block text-slate-300 text-sm mb-1">Flag *</label>
          <input
            value={value.flag}
            onChange={(e) => onChange({ flag: e.target.value })}
            className="w-full p-2 rounded bg-navy-800 border border-navy-700 text-slate-200"
            placeholder="Panama"
            required
          />
        </div>
      </div>
    </SectionCard>
  );
};

export default IdentificationFormCard;