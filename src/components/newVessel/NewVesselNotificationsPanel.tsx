import React, { useState } from 'react';
import type { NotificationRule } from '../../types';

type Props = {
  value: NotificationRule[];
  onChange: (items: NotificationRule[]) => void;
};

const NewVesselNotificationsPanel: React.FC<Props> = ({ value, onChange }) => {
  const [channel, setChannel] = useState<'email'|'phone'>('email');
  const [target, setTarget] = useState('');
  const [label, setLabel] = useState('');

  const add = () => {
    const t = target.trim();
    if (!t) return;
    const item: NotificationRule = {
      id: `nt-${Date.now()}`,
      channel,
      target: t,
      label: label.trim() || undefined,
    };
    onChange([...value, item]);
    setTarget('');
    setLabel('');
  };

  const remove = (id: string) => onChange(value.filter(v => v.id !== id));

  return (
    <div className="bg-navy-800/60 border border-navy-700 rounded-xl p-4">
      <h2 className="text-lg font-semibold text-slate-100 mb-3">Notifications</h2>

      <div className="grid grid-cols-1 sm:grid-cols-[110px_1fr_120px] gap-2 mb-3">
        <select
          value={channel}
          onChange={e => setChannel(e.target.value as 'email'|'phone')}
          className="p-2 rounded bg-navy-900 border border-navy-700 text-slate-200"
        >
          <option value="email">Email</option>
          <option value="phone">Phone</option>
        </select>
        <input
          value={target}
          onChange={e => setTarget(e.target.value)}
          placeholder={channel === 'email' ? 'email@example.com' : '+56 9 1234 5678'}
          className="p-2 rounded bg-navy-900 border border-navy-700 text-slate-200"
        />
        <input
          value={label}
          onChange={e => setLabel(e.target.value)}
          placeholder="Label (optional)"
          className="p-2 rounded bg-navy-900 border border-navy-700 text-slate-200 sm:col-span-1 col-span-1"
        />
      </div>
      <div className="mb-3">
        <button
          type="button"
          onClick={add}
          className="px-3 py-2 rounded bg-teal-500 hover:bg-teal-400 text-navy-900 font-semibold border border-teal-400"
        >
          Add
        </button>
      </div>

      {value.length === 0 ? (
        <div className="text-slate-400 text-sm">No notifications configured.</div>
      ) : (
        <ul className="space-y-2">
          {value.map(n => (
            <li key={n.id} className="flex items-center justify-between bg-navy-900 border border-navy-700 rounded-lg px-3 py-2">
              <div className="text-slate-200 text-sm truncate">
                <span className="px-2 py-0.5 mr-2 rounded bg-navy-800 border border-navy-600 text-slate-300 text-xs">
                  {n.channel}
                </span>
                {n.target}
                {n.label && <span className="ml-2 text-slate-400">• {n.label}</span>}
              </div>
              <button
                type="button"
                onClick={() => remove(n.id)}
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

export default NewVesselNotificationsPanel;