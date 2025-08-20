import React from "react";
import SectionCard from "../vessel/SectionCard";
import { Phone } from "lucide-react";

export type ContactFormState = {
  email: string;
  phone: string;
};

type Props = {
  value: ContactFormState;
  onChange: (patch: Partial<ContactFormState>) => void;
};

const ContactFormCard: React.FC<Props> = ({ value, onChange }) => {
  return (
    <SectionCard title="Contact information" icon={Phone}>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-slate-300 text-sm mb-1">Contact Email</label>
          <input
            type="email"
            name="email"
            value={value.email}
            onChange={(e) => onChange({ email: e.target.value })}
            className="w-full p-2 rounded bg-navy-800 border border-navy-700 text-slate-200"
            placeholder="ops@shipowner.com"
          />
        </div>
        <div>
          <label className="block text-slate-300 text-sm mb-1">Phone</label>
          <input
            name="phone"
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