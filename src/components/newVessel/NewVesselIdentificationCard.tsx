import React from 'react';
import type { FormState } from './NewVesselForm';

type Props = {
  form: FormState;
  setForm: React.Dispatch<React.SetStateAction<FormState>>;
};

const NewVesselIdentificationCard: React.FC<Props> = ({ form, setForm }) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  return (
    <section className="bg-navy-800/60 border border-navy-700 rounded-xl p-4 space-y-4">
      <h2 className="text-xl font-semibold text-slate-100">Identification</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-slate-300 text-sm mb-1">IMO *</label>
          <input
            name="id"
            value={form.id}
            onChange={onChange}
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
            onChange={onChange}
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
            onChange={onChange}
            className="w-full p-2 rounded bg-navy-800 border border-navy-700 text-slate-200"
            placeholder="Panama"
            required
          />
        </div>
      </div>
    </section>
  );
};

export default NewVesselIdentificationCard;