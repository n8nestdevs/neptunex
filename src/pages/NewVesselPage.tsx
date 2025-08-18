// src/pages/NewVesselPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Vessel, ChecklistItem } from '../types';
import { initialVessels } from '../data/mockData';
import ChecklistBuilder from '../components/ChecklistBuilder';

type FormState = {
  id: string;
  name: string;
  flag: string;
  email: string;
  phone: string;
  departurePort: string;
  etd: string;
  destinationPort: string;
  eta: string;
  lat: string;
  lon: string;
  sog: string;
  cog: string;
};

const NewVesselPage: React.FC = () => {
  const navigate = useNavigate();

  // Form state
  const [form, setForm] = useState<FormState>({
    id: '',
    name: '',
    flag: '',
    email: '',
    phone: '',
    departurePort: '',
    etd: '',
    destinationPort: '',
    eta: '',
    lat: '',
    lon: '',
    sog: '',
    cog: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // Checklist selected for this vessel
  const [checklist, setChecklist] = useState<ChecklistItem[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!form.id || !form.name || !form.flag) return 'Required fields missing (IMO, Name, Flag).';
    if (!form.etd || !form.eta) return 'You must enter ETD and ETA.';
    if (form.lat && isNaN(Number(form.lat))) return 'Latitude must be numeric.';
    if (form.lon && isNaN(Number(form.lon))) return 'Longitude must be numeric.';
    if (form.lat) {
      const v = Number(form.lat);
      if (v < -90 || v > 90) return 'Latitude out of range (-90 to 90).';
    }
    if (form.lon) {
      const v = Number(form.lon);
      if (v < -180 || v > 180) return 'Longitude out of range (-180 to 180).';
    }
    if (form.sog && isNaN(Number(form.sog))) return 'SOG must be numeric.';
    if (form.cog && isNaN(Number(form.cog))) return 'COG must be numeric.';
    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const err = validate();
    if (err) { setError(err); return; }

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
      documents: [],
      // Store exactly what was built on the right panel
      complianceChecklist: checklist,
      position:
        latNum != null && lonNum != null
          ? { lat: latNum, lon: lonNum, sog: sogNum, cog: cogNum }
          : undefined,
    };

    initialVessels.push(newVessel);
    navigate('/tracking');
  };

  return (
    // Two columns: left form, right checklist
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
      <div className="space-y-6 max-w-3xl">
        <h1 className="text-2xl font-bold text-slate-100">Add New Vessel</h1>

        {error && (
          <div className="p-3 rounded bg-red-900/40 border border-red-700 text-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 text-sm mb-1">IMO *</label>
              <input
                name="id"
                value={form.id}
                onChange={handleChange}
                className="w-full p-2 rounded bg-navy-800 border border-navy-700 text-slate-200"
                placeholder="IMO9334567"
                required
              />
            </div>
            <div>
              <label className="block text-slate-300 text-sm mb-1">Name *</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full p-2 rounded bg-navy-800 border border-navy-700 text-slate-200"
                placeholder="Andromeda Voyager"
                required
              />
            </div>
            <div>
              <label className="block text-slate-300 text-sm mb-1">Flag *</label>
              <input
                name="flag"
                value={form.flag}
                onChange={handleChange}
                className="w-full p-2 rounded bg-navy-800 border border-navy-700 text-slate-200"
                placeholder="Panama"
                required
              />
            </div>
            <div>
              <label className="block text-slate-300 text-sm mb-1">Contact Email</label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                className="w-full p-2 rounded bg-navy-800 border border-navy-700 text-slate-200"
                placeholder="ops@shipowner.com"
              />
            </div>
            <div>
              <label className="block text-slate-300 text-sm mb-1">Phone</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full p-2 rounded bg-navy-800 border border-navy-700 text-slate-200"
                placeholder="+56 9 1234 5678"
              />
            </div>
          </div>

          {/* Voyage Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 text-sm mb-1">Departure Port</label>
              <input
                name="departurePort"
                value={form.departurePort}
                onChange={handleChange}
                className="w-full p-2 rounded bg-navy-800 border border-navy-700 text-slate-200"
                placeholder="Valparaíso"
              />
            </div>
            <div>
              <label className="block text-slate-300 text-sm mb-1">ETD</label>
              <input
                name="etd"
                value={form.etd}
                onChange={handleChange}
                type="datetime-local"
                className="w-full p-2 rounded bg-navy-800 border border-navy-700 text-slate-200"
                required
              />
            </div>
            <div>
              <label className="block text-slate-300 text-sm mb-1">Destination Port</label>
              <input
                name="destinationPort"
                value={form.destinationPort}
                onChange={handleChange}
                className="w-full p-2 rounded bg-navy-800 border border-navy-700 text-slate-200"
                placeholder="San Antonio"
              />
            </div>
            <div>
              <label className="block text-slate-300 text-sm mb-1">ETA</label>
              <input
                name="eta"
                value={form.eta}
                onChange={handleChange}
                type="datetime-local"
                className="w-full p-2 rounded bg-navy-800 border border-navy-700 text-slate-200"
                required
              />
            </div>
          </div>

          {/* Position (optional) */}
          <div className="bg-navy-800/50 border border-navy-700 rounded-lg p-4 space-y-3">
            <div className="text-slate-300 font-medium">Initial Position (optional)</div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-slate-300 text-sm mb-1">Lat (-90 to 90)</label>
                <input
                  name="lat"
                  value={form.lat}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-navy-800 border border-navy-700 text-slate-200"
                  placeholder="-33.45"
                />
              </div>
              <div>
                <label className="block text-slate-300 text-sm mb-1">Lon (-180 to 180)</label>
                <input
                  name="lon"
                  value={form.lon}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-navy-800 border border-navy-700 text-slate-200"
                  placeholder="-70.67"
                />
              </div>
              <div>
                <label className="block text-slate-300 text-sm mb-1">SOG (kn)</label>
                <input
                  name="sog"
                  value={form.sog}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-navy-800 border border-navy-700 text-slate-200"
                  placeholder="12.3"
                />
              </div>
              <div>
                <label className="block text-slate-300 text-sm mb-1">COG (°)</label>
                <input
                  name="cog"
                  value={form.cog}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-navy-800 border border-navy-700 text-slate-200"
                  placeholder="280"
                />
              </div>
            </div>
            <div className="text-slate-500 text-xs">
              If no lat/lon is entered, the vessel will be created without a position and will not appear on the map until AIS data is received.
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="bg-teal-500 hover:bg-teal-400 text-navy-900 font-semibold px-4 py-2 rounded-md border border-teal-400 disabled:opacity-60"
          >
            {saving ? 'Saving…' : 'Save'}
          </button>
        </form>
      </div>

      {/* RIGHT COLUMN: Checklist builder (top-aligned, no overflow) */}
      <div className="self-start w-full max-w-[360px]">
        <ChecklistBuilder value={checklist} onChange={setChecklist} />
      </div>
    </div>
  );
};

export default NewVesselPage;