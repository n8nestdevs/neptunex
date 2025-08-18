import React, { useMemo, useState } from "react";
import type { ChecklistItem } from "../types";
import { CHECKLIST_CATALOG } from "../data/checklistCatalog";

type Props = {
  value: ChecklistItem[];
  onChange: (items: ChecklistItem[]) => void;
};

const ChecklistBuilder: React.FC<Props> = ({ value, onChange }) => {
  const [selectedId, setSelectedId] = useState<string>("");

  // Opciones que aún no están agregadas
  const remaining = useMemo(() => {
    const chosen = new Set(value.map(v => v.id));
    return CHECKLIST_CATALOG.filter(c => !chosen.has(c.id));
  }, [value]);

  const addItem = () => {
    if (!selectedId) return;
    const found = CHECKLIST_CATALOG.find(c => c.id === selectedId);
    if (!found) return;
    onChange([...value, { id: found.id, task: found.task, completed: false }]);
    setSelectedId("");
  };

  const toggle = (id: string) => {
    onChange(
      value.map(v => (v.id === id ? { ...v, completed: !v.completed } : v))
    );
  };

  const removeItem = (id: string) => {
    onChange(value.filter(v => v.id !== id));
  };

  return (
    <div className="bg-navy-800 rounded-lg border border-navy-700 p-3">
      <div className="text-slate-200 font-semibold mb-3">Checklist</div>

      {/* Selector para agregar desde catálogo */}
      <div className="flex gap-2 mb-4">
        <select
          value={selectedId}
          onChange={e => setSelectedId(e.target.value)}
          className="flex-1 bg-navy-900 border border-navy-700 rounded px-2 py-2 text-slate-200"
        >
          <option value="">Añadir ítem…</option>
          {remaining.map(opt => (
            <option key={opt.id} value={opt.id}>{opt.task}</option>
          ))}
        </select>
        <button
          type="button"
          onClick={addItem}
          disabled={!selectedId}
          className="px-3 py-2 rounded bg-teal-500 text-navy-900 font-semibold border border-teal-400 disabled:opacity-50"
        >
          Agregar
        </button>
      </div>

      {/* Lista seleccionada */}
      {value.length === 0 ? (
        <div className="text-slate-400 text-sm">No hay tareas agregadas.</div>
      ) : (
        <ul className="space-y-2 max-h-[50vh] overflow-auto pr-1">
          {value.map(item => (
            <li key={item.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => toggle(item.id)}
                className="w-5 h-5 rounded bg-navy-700 border-slate-400 text-teal-500 focus:ring-teal-400"
              />
              <span className={`text-sm ${item.completed ? "text-slate-400 line-through" : "text-slate-200"}`}>
                {item.task}
              </span>
              <button
                type="button"
                onClick={() => removeItem(item.id)}
                className="ml-auto text-xs px-2 py-1 rounded border border-navy-600 text-slate-300 hover:bg-navy-700"
              >
                Quitar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ChecklistBuilder;