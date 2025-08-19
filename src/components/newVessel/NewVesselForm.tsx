import React from 'react';

import NewVesselIdentificationCard from './NewVesselIdentificationCard';
import NewVesselContactCard from './NewVesselContactCard';
import NewVesselVoyageCard from './NewVesselVoyageCard';

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
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {/* 1) IDENTIFICATION */}
      <NewVesselIdentificationCard form={form} setForm={setForm} />

      {/* 2) CONTACT INFORMATION */}
      <NewVesselContactCard form={form} setForm={setForm} />

      {/* 3) VOYAGE */}
      <NewVesselVoyageCard form={form} setForm={setForm} />

      {/* 4) INITIAL POSITION (opcional) */}
      <section className="bg-navy-800/60 border border-navy-700 rounded-xl p-4 space-y-3">
        <div className="text-slate-300 font-medium">Initial Position (optional)</div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-slate-300 text-sm mb-1">Lat (-90 to 90)</label>
            <input
              name="lat"
              value={form.lat}
              onChange={onChange}
              className="w-full p-2 rounded bg-navy-800 border border-navy-700 text-slate-200"
              placeholder="-33.45"
            />
          </div>
          <div>
            <label className="block text-slate-300 text-sm mb-1">Lon (-180 to 180)</label>
            <input
              name="lon"
              value={form.lon}
              onChange={onChange}
              className="w-full p-2 rounded bg-navy-800 border border-navy-700 text-slate-200"
              placeholder="-70.67"
            />
          </div>
          <div>
            <label className="block text-slate-300 text-sm mb-1">SOG (kn)</label>
            <input
              name="sog"
              value={form.sog}
              onChange={onChange}
              className="w-full p-2 rounded bg-navy-800 border border-navy-700 text-slate-200"
              placeholder="12.3"
            />
          </div>
          <div>
            <label className="block text-slate-300 text-sm mb-1">COG (°)</label>
            <input
              name="cog"
              value={form.cog}
              onChange={onChange}
              className="w-full p-2 rounded bg-navy-800 border border-navy-700 text-slate-200"
              placeholder="280"
            />
          </div>
        </div>
        <div className="text-slate-500 text-xs">
          If no lat/lon is entered, the vessel will be created without a position and will not appear on the map until AIS data is received.
        </div>
      </section>

      {/* SAVE */}
      <div>
        <button
          type="submit"
          disabled={saving}
          className="bg-teal-500 hover:bg-teal-400 text-navy-900 font-semibold px-4 py-2 rounded-md border border-teal-400 disabled:opacity-60"
        >
          {saving ? 'Saving…' : 'Save'}
        </button>
      </div>
    </form>
  );
};

export default NewVesselForm;