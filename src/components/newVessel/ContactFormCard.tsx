// src/components/newVessel/ContactFormCard.tsx
import React from 'react';
import SectionCard from '../vessel/SectionCard';
import { PhoneIcon } from '../Icons';

export type ContactFormState = {
  email: string;
  phone: string;
};

type Props = {
  value: ContactFormState & Record<string, any>;
  onChange: (patch: Partial<ContactFormState>) => void;
};

const ContactFormCard: React.FC<Props> = ({ value, onChange }) => {
  return (
    <SectionCard title="Contact Information" icon={<PhoneIcon className="w-6 h-6" />}>
      <div className="space-y-3">
        <div>
          <label className="block text-slate-300 text-sm mb-1">Email</label>
          <input
            type="email"
            value={value.email}
            onChange={(e) => onChange({ email: e.target.value })}
            className="w-full p-2 rounded bg-navy-800 border border-navy-700 text-slate-200"
            placeholder="ops@shipowner.com"
          />
        </div>
        <div>
          <label className="block text-slate-300 text-sm mb-1">Phone</label>
          <input
            value={value.phone}
            onChange={(e) => onChange({ phone: e.target.value })}
            className="w-full p-2 rounded bg-navy-800 border border-navy-700 text-slate-200"
            placeholder="+56 9 1234 5678"
          />
        </div>
      </div>
    </SectionCard>
  );
};

export default ContactFormCard;