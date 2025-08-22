import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Vessel, ChecklistItem, Document } from '../types';
import { initialVessels } from '../data/mockData';

type FormState = {
  id: string; name: string; flag: string;
  email: string; phone: string;
  departurePort: string; etd: string;
  destinationPort: string; eta: string;
  lat: string; lon: string; sog: string; cog: string;
};

const NewVesselPageSafe: React.FC = () => {
  const navigate = useNavigate();

  // ---------------- Form principal
  const [form, setForm] = useState<FormState>({
    id: '', name: '', flag: '',
    email: '', phone: '',
    departurePort: '', etd: '',
    destinationPort: '', eta: '',
    lat: '', lon: '', sog: '', cog: '',
  });
  const setFormPartial = (p: Partial<FormState>) => setForm(prev => ({ ...prev, ...p }));

  // ---------------- Estados locales de la columna derecha
  const [checklist, setChecklist] = useState<ChecklistItem[]>([]);
  const [documents, setDocuments]   = useState<Document[]>([]);
  const [notifications, setNotifications] =
    useState<{id:string; channel:'email'|'phone'; target:string; label?:string}[]>([]);
  const [error, setError] = useState<string|null>(null);
  const [saving, setSaving] = useState(false);

  // Plantilla (segura) desde los mock
  const template = useMemo(() => {
    const s = new Set<string>();
    initialVessels.forEach(v => v.complianceChecklist.forEach(i => i.task && s.add(i.task)));
    return Array.from(s).sort((a,b)=>a.localeCompare(b));
  }, []);

  // ---------------- Validación y submit
  const validate = () => {
    if (!form.id || !form.name || !form.flag) return 'Required fields missing (IMO, Name, Flag).';
    if (!form.etd || !form.eta) return 'You must enter ETD and ETA.';
    if (form.lat && isNaN(Number(form.lat))) return 'Latitude must be numeric.';
    if (form.lon && isNaN(Number(form.lon))) return 'Longitude must be numeric.';
    if (form.lat) { const v=Number(form.lat); if (v<-90||v>90) return 'Latitude out of range (-90 to 90).'; }
    if (form.lon) { const v=Number(form.lon); if (v<-180||v>180) return 'Longitude out of range (-180 to 180).'; }
    if (form.sog && isNaN(Number(form.sog))) return 'SOG must be numeric.';
    if (form.cog && isNaN(Number(form.cog))) return 'COG must be numeric.';
    return null;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const err = validate(); if (err) { setError(err); return; }
    setSaving(true);

    const latNum = form.lat ? Number(form.lat) : undefined;
    const lonNum = form.lon ? Number(form.lon) : undefined;
    const sogNum = form.sog ? Number(form.sog) : undefined;
    const cogNum = form.cog ? Number(form.cog) : undefined;

    const newVessel: Vessel = {
      id: form.id,
      name: form.name,
      flag: form.flag,
      imageUrl: 'https://picsum.photos/seed/' + encodeURIComponent(form.id) + '/800/600',
      contact: { email: form.email, phone: form.phone },
      voyage: {
        departurePort: form.departurePort,
        etd: form.etd,
        destinationPort: form.destinationPort,
        eta: form.eta,
      },
      documents,
      complianceChecklist: checklist,
      position: (latNum!=null && lonNum!=null) ? { lat: latNum, lon: lonNum, sog: sogNum, cog: cogNum } : undefined,
    };

    initialVessels.push(newVessel);
    navigate('/tracking');
  };

  // ---------------- Helpers UI
  const [docName, setDocName] = useState('');
  const addDoc = () => {
    const t = docName.trim(); if (!t) return;
    setDocuments(d => [...d, { id:`doc-${Date.now()}`, name:t, url:'#', uploadedAt:new Date().toISOString() }]);
    setDocName('');
  };

  const [tplSel, setTplSel] = useState('');
  const addChecklistFromTpl = () => {
    if (!tplSel) return;
    setChecklist(arr => {
      if (arr.some(i => i.task.toLowerCase() === tplSel.toLowerCase())) return arr;
      return [...arr, { id:`c-${Date.now()}`, task: tplSel, completed:false }];
    });
    setTplSel('');
  };
  const toggleItem = (id: string, val: boolean) =>
    setChecklist(arr => arr.map(i => i.id===id ? {...i, completed:val} : i));

  const [ch, setCh] = useState<'email'|'phone'>('email');
  const [tg, setTg] = useState('');
  const [lb, setLb] = useState(''); // ← se mantiene pero no se muestra (por si luego lo quieres usar)
  const addNotif = () => {
    const t = tg.trim(); if (!t) return;
    setNotifications(ns => [...ns, { id:`n-${Date.now()}`, channel: ch, target: t, label: lb.trim() || undefined }]);
    setTg(''); setLb('');
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-slate-100">Add New Vessel</h1>
      {error && <div className="p-3 rounded bg-red-900/40 border border-red-700 text-red-200">{error}</div>}

      <form onSubmit={onSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
        {/* Columna izquierda (omitida aquí para abreviar, sin cambios) */}

        {/* Columna derecha */}
        <div className="lg:col-span-1 space-y-4">
          {/* ... Documents y Checklist (sin cambios) ... */}

          {/* Notifications (inline, sin Label) */}
          <div className="bg-navy-800/60 border border-navy-700 rounded-xl p-4">
            <h2 className="text-lg font-semibold text-slate-100 mb-3">Notifications</h2>

            {/* Fila: select + target + botón */}
            <div className="grid grid-cols-1 sm:grid-cols-[110px_minmax(0,1fr)_auto] items-center gap-2">
              <select
                className="p-2 rounded bg-navy-900 border border-navy-700 text-slate-200"
                onChange={e=>setCh(e.target.value as 'email'|'phone')}
                value={ch}
              >
                <option value="email">Email</option>
                <option value="phone">Phone</option>
              </select>

              <input
                className="min-w-0 p-2 rounded bg-navy-900 border border-navy-700 text-slate-200"
                placeholder={ch==='email' ? 'email@example.com' : '+56 9 1234 5678'}
                value={tg}
                onChange={e=>setTg(e.target.value)}
              />

              <button
                type="button"
                onClick={addNotif}
                className="px-3 py-2 rounded bg-teal-500 hover:bg-teal-400 text-navy-900 font-semibold border border-teal-400"
              >
                Add
              </button>
            </div>

            {notifications.length>0 && (
              <ul className="mt-3 space-y-2">
                {notifications.map(n=>(
                  <li key={n.id} className="flex items-center justify-between bg-navy-900 border border-navy-700 rounded-lg px-3 py-2">
                    <div className="text-slate-200 text-sm truncate">
                      <span className="px-2 py-0.5 mr-2 rounded bg-navy-800 border border-navy-600 text-slate-300 text-xs">{n.channel}</span>
                      {n.target}{n.label && <span className="ml-2 text-slate-400">• {n.label}</span>}
                    </div>
                    <button
                      type="button"
                      onClick={()=>setNotifications(ns=>ns.filter(x=>x.id!==n.id))}
                      className="text-sm px-2 py-1 rounded bg-navy-800 border border-navy-600 hover:bg-navy-700 text-slate-200"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewVesselPageSafe;