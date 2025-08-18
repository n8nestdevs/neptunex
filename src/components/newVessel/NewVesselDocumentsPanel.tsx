import React, { useState } from 'react';
import type { Document } from '../../types';

type Props = {
  value: Document[];
  onChange: (docs: Document[]) => void;
};

const NewVesselDocumentsPanel: React.FC<Props> = ({ value, onChange }) => {
  const [name, setName] = useState('');

  const add = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    const doc: Document = {
      id: `doc-${Date.now()}`,
      name: trimmed,
      url: '#',
      uploadedAt: new Date().toISOString(),
    };
    onChange([...value, doc]);
    setName('');
  };

  const remove = (id: string) => onChange(value.filter(d => d.id !== id));

  return (
    <div className="bg-navy-800/60 border border-navy-700 rounded-xl p-4">
      <h2 className="text-lg font-semibold text-slate-100 mb-3">Documents</h2>

      <div className="flex gap-2 mb-3">
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Add document name…"
          className="flex-1 p-2 rounded bg-navy-900 border border-navy-700 text-slate-200"
        />
        <button
          type="button"
          onClick={add}
          className="px-3 py-2 rounded bg-teal-500 hover:bg-teal-400 text-navy-900 font-semibold border border-teal-400"
        >
          Add
        </button>
      </div>

      {value.length === 0 ? (
        <div className="text-slate-400 text-sm">No documents added yet.</div>
      ) : (
        <ul className="space-y-2">
          {value.map(d => (
            <li key={d.id} className="flex items-center justify-between bg-navy-900 border border-navy-700 rounded-lg px-3 py-2">
              <span className="text-slate-200 text-sm truncate">{d.name}</span>
              <button
                type="button"
                onClick={() => remove(d.id)}
                className="text-sm px-2 py-1 rounded bg-navy-800 border border-navy-600 hover:bg-navy-700 text-slate-200"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NewVesselDocumentsPanel;