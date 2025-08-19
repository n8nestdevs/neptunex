import React from 'react';
import type { FormState } from './NewVesselForm';

type Props = {
  form: FormState;
  setForm: React.Dispatch<React.SetStateAction<FormState>>;
};

const NewVesselContactCard: React.FC<Props> = ({ form, setForm }) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  return (
    <section className="bg-navy-800/60 border border-navy-700 rounded-xl p-4 space-y-4">
      <h2 className="text-xl font-semibold text-slate-100">Contact Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-slate-300 text-sm mb-1">Contact Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={onChange}
            className="w-full p-2 rounded bg-navy-800 border border-navy-700 text-slate-200"
            placeholder="ops@shipowner.com"
          />
        </div>
        <div>
          <label className="block text-slate-300 text-sm mb-1">Phone</label>
          <input
            name="phone"
            value={form.phone}
            onChange={onChange}
            className="w-full p-2 rounded bg-navy-800 border border-navy-700 text-slate-200"
            placeholder="+56 9 1234 5678"
          />
        </div>
      </div>
    </section>
  );
};

export default NewVesselContactCard;