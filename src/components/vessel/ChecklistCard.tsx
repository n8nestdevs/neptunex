// src/components/vessel/ChecklistCard.tsx
import React from 'react';
import { Vessel } from '../../types';
import SectionCard from './SectionCard';
import { IconCheck } from '../Icons';
import { useAppContext } from '../../context/AppContext';

const ChecklistCard: React.FC<{ vessel: Vessel }> = ({ vessel }) => {
  const { userRole, updateChecklistItem } = useAppContext();
  const isAdmin = userRole === 'Admin';

  return (
    <SectionCard title="Checklist" icon={<IconCheck className="w-6 h-6" />}>
      <ul className="space-y-3">
        {vessel.complianceChecklist.map((item) => (
          <li key={item.id} className="flex items-center">
            <label className={`flex items-center w-full ${isAdmin ? 'cursor-pointer' : 'cursor-default'}`}>
              <input
                type="checkbox"
                checked={item.completed}
                onChange={(e) => isAdmin && updateChecklistItem(vessel.id, item.id, e.target.checked)}
                disabled={!isAdmin}
                className="w-5 h-5 rounded bg-navy-700 border-slate-400 text-teal-500 focus:ring-teal-400 disabled:opacity-50"
              />
              <span className={`ml-3 text-sm ${item.completed ? 'text-slate-400 line-through' : 'text-slate-200'}`}>
                {item.task}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </SectionCard>
  );
};

export default ChecklistCard;