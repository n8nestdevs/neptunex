import React from 'react';
import type { FormState } from './NewVesselForm';

type Props = {
  form: FormState;
  setForm: React.Dispatch<React.SetStateAction<FormState>>;
};

const NewVesselVoyageCard: React.FC<Props> = ({ form, setForm }) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  return (
    <section className="bg-navy-800/60 border border-navy-700 rounded-xl p-4 space-y-4">
      <h2 className="text-xl font-semibold text-slate-100">Voyage</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-slate-300 text-sm mb-1">Departure Port</label>
          <input
            name="departurePort"
            value={form.departurePort}
            onChange={onChange}
            className="w-full p-2 rounded bg-navy-800 border border-navy-700 text-slate-200"
            placeholder="Port of Houston, USA"
          />
        </div>
        <div>
          <label className="block text-slate-300 text-sm mb-1">ETD</label>
          <input
            name="etd"
            type="datetime-local"
            value={form.etd}
            onChange={onChange}
            className="w-full p-2 rounded bg-navy-800 border border-navy-700 text-slate-200"
            required
          />
        </div>
        <div>
          <label className="block text-slate-300 text-sm mb-1">Destination Port</label>
          <input
            name="destinationPort"
            value={form.destinationPort}
            onChange={onChange}
            className="w-full p-2 rounded bg-navy-800 border border-navy-700 text-slate-200"
            placeholder="Port of Rotterdam, Netherlands"
          />
        </div>
        <div>
          <label className="block text-slate-300 text-sm mb-1">ETA</label>
          <input
            name="eta"
            type="datetime-local"
            value={form.eta}
            onChange={onChange}
            className="w-full p-2 rounded bg-navy-800 border border-navy-700 text-slate-200"
            required
          />
        </div>
      </div>
    </section>
  );
};

export default NewVesselVoyageCard;