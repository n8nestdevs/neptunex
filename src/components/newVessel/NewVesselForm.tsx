// src/components/newVessel/NewVesselForm.tsx
import React from 'react';

export type FormState = {
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

type Props = {
  form: FormState;
  setForm: React.Dispatch<React.SetStateAction<FormState>>;
  saving: boolean;
  onSubmit: (e: React.FormEvent) => void;
};

const NewVesselForm: React.FC<Props> = ({ form, setForm, saving, onSubmit }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-slate-300 text-sm mb-1">IMO *</label>
          <input name="id" value={form.id} onChange={handleChange}
            className="w-full p-2 rounded bg-navy-800 border border-navy-700 text-slate-200"
            placeholder="IMO9334567" required />
        </div>
        <div>
          <label className="block text-slate-300 text-sm mb-1">Name *</label>
          <input name="name" value={form.name} onChange={handleChange}
            className="w-full p-2 rounded bg-navy-800 border border-navy-700 text-slate-200"
            placeholder="Andromeda Voyager" required />
        </div>
        <div>
          <label className="block text-slate-300 text-sm mb-1">Flag *</label>
          <input name="flag" value={form.flag} onChange={handleChange}
            className="w-full p-2 rounded bg-navy-800 border border-navy-700 text-slate-200"
            placeholder="Panama" required />
        </div>
        <div>
          <label className="block text-slate-300 text-sm mb-1">Contact Email</label>
          <input name="email" type="email" value={form.email} onChange={handleChange}
            className="w-full p-2 rounded bg-navy-800 border border-navy-700 text-slate-200"
            placeholder="ops@shipowner.com" />
        </div>
        <div>
          <label className="block text-slate-300 text-sm mb-1">Phone</label>
          <input name="phone" value={form.phone} onChange={handleChange}
            className="w-full p-2 rounded bg-navy-800 border border-navy-700 text-slate-200"
            placeholder="+56 9 1234 5678" />
        </div>
      </div>

      {/* Voyage Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-slate-300 text-sm mb-1">Departure Port</label>
          <input name="departurePort" value={form.departurePort} onChange={handleChange}
            className="w-full p-2 rounded bg-navy-800 border border-navy-700 text-slate-200"
            placeholder="Valparaíso" />
        </div>
        <div>
          <label className="block text-slate-300 text-sm mb-1">ETD</label>
          <input name="etd" type="datetime-local" value={form.etd} onChange={handleChange}
            className="w-full p-2 rounded bg-navy-800 border border-navy-700 text-slate-200" required />
        </div>
        <div>
          <label className="block text-slate-300 text-sm mb-1">Destination Port</label>
          <input name="destinationPort" value={form.destinationPort} onChange={handleChange}
            className="w-full p-2 rounded bg-navy-800 border border-navy-700 text-slate-200"
            placeholder="San Antonio" />
        </div>
        <div>
          <label className="block text-slate-300 text-sm mb-1">ETA</label>
          <input name="eta" type="datetime-local" value={form.eta} onChange={handleChange}
            className="w-full p-2 rounded bg-navy-800 border border-navy-700 text-slate-200" required />
        </div>
      </div>

      {/* Position (optional) */}
      <div className="bg-navy-800/50 border border-navy-700 rounded-lg p-4 space-y-3">
        <div className="text-slate-300 font-medium">Initial Position (optional)</div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-slate-300 text-sm mb-1">Lat (-90 to 90)</label>
            <input name="lat" value={form.lat} onChange={handleChange}
              className="w-full p-2 rounded bg-navy-800 border border-navy-700 text-slate-200"
              placeholder="-33.45" />
          </div>
          <div>
            <label className="block text-slate-300 text-sm mb-1">Lon (-180 to 180)</label>
            <input name="lon" value={form.lon} onChange={handleChange}
              className="w-full p-2 rounded bg-navy-800 border border-navy-700 text-slate-200"
              placeholder="-70.67" />
          </div>
          <div>
            <label className="block text-slate-300 text-sm mb-1">SOG (kn)</label>
            <input name="sog" value={form.sog} onChange={handleChange}
              className="w-full p-2 rounded bg-navy-800 border border-navy-700 text-slate-200"
              placeholder="12.3" />
          </div>
          <div>
            <label className="block text-slate-300 text-sm mb-1">COG (°)</label>
            <input name="cog" value={form.cog} onChange={handleChange}
              className="w-full p-2 rounded bg-navy-800 border border-navy-700 text-slate-200"
              placeholder="280" />
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
  );
};

export default NewVesselForm;