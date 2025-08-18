import React, { useMemo, useState } from 'react';
import { Vessel } from '../../types';
import SectionCard from './SectionCard';
import { IconCheck } from '../Icons';
import { useAppContext } from '../../context/AppContext';
import { UserRole } from '../../types';

const ChecklistCard: React.FC<{ vessel: Vessel }> = ({ vessel }) => {
  const { userRole, updateChecklistItem, addChecklistItem, getChecklistTemplate } = useAppContext();
  const isAdmin = userRole === UserRole.Admin;

  // Opciones disponibles = plantilla global menos los ya presentes
  const availableOptions = useMemo(() => {
    const current = new Set(vessel.complianceChecklist.map(i => i.task.toLowerCase()));
    return getChecklistTemplate().filter(t => !current.has(t.toLowerCase()));
  }, [getChecklistTemplate, vessel.complianceChecklist]);

  const [selected, setSelected] = useState<string>('');

  const onAdd = () => {
    if (!isAdmin || !selected) return;
    addChecklistItem(vessel.id, selected);
    setSelected('');
  };

  return (
    <SectionCard title="Checklist" icon={<IconCheck className="w-6 h-6" />}>
      {/* Admin: agregar desde listado global */}
      {isAdmin && (
        <div className="mb-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <select
            className="flex-1 rounded-md bg-navy-700 border border-navy-600 text-slate-100 px-3 py-2"
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          >
            <option value="">Add item from template…</option>
            {availableOptions.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          <button
            type="button"
            onClick={onAdd}
            disabled={!selected}
            className="px-4 py-2 rounded-md bg-teal-500 hover:bg-teal-400 text-navy-900 font-semibold disabled:opacity-50"
          >
            Add
          </button>
        </div>
      )}

      <ul className="space-y-3">
        {vessel.complianceChecklist.map(item => (
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
        {vessel.complianceChecklist.length === 0 && (
          <li className="text-sm text-slate-400">No checklist items yet.</li>
        )}
      </ul>
    </SectionCard>
  );
};

export default ChecklistCard;