// src/components/newVessel/NewVesselChecklistPanel.tsx
import React from 'react';
import type { ChecklistItem } from '../../types';
import ChecklistBuilder from '../ChecklistBuilder';

type Props = {
  value: ChecklistItem[];
  onChange: (items: ChecklistItem[]) => void;
};

const NewVesselChecklistPanel: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div
      className="
        self-start
        lg:sticky lg:top-16
        bg-navy-800/60 border border-navy-700 rounded-xl
        p-4
        max-h-[calc(100vh-64px-24px)]
        overflow-auto
      "
      // top-16 (64px) ≈ altura del header → queda alineado con el título de la izquierda
      // max-h: evita que el botón se vaya “fuera” y no genera scroll global
    >
      <h2 className="text-lg font-semibold text-slate-100 mb-3">Checklist</h2>

      <ChecklistBuilder value={value} onChange={onChange} />
    </div>
  );
};

export default NewVesselChecklistPanel;