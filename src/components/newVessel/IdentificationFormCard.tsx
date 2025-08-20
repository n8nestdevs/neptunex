import React from "react";
import SectionCard from "../vessel/SectionCard";
import { IdCard } from "lucide-react";

export type IdentificationFormState = {
  id: string;
  name: string;
  flag: string;
};

type Props = {
  value: IdentificationFormState;
  onChange: (patch: Partial<IdentificationFormState>) => void;
};

const IdentificationFormCard: React.FC<Props> = ({ value, onChange }) => {
  return (
    <SectionCard title="Identification" icon={IdCard}>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-slate-300 text-sm mb-1">IMO *</label>
          <input
            name="id"
            value={value.id}
            onChange={(e) => onChange({ id: e.target.value })}
            className="w-full p-2 rounded bg-navy-800 border border-navy-700 text-slate-200"
            placeholder="IMO9334567"
            required
          />
        </div>
        <div>
          <label className="block text-slate-300 text-sm mb-1">Name *</label>
          <input
            name="name"
            value={value.name}
            onChange={(e) => onChange({ name: e.target.value })}
            className="w-full p-2 rounded bg-navy-800 border border-navy-700 text-slate-200"
            placeholder="Andromeda Voyager"
            required
          />
        </div>
        <div>
          <label className="block text-slate-300 text-sm mb-1">Flag *</label>
          <input
            name="flag"
            value={value.flag}
            onChange={(e) => onChange({ flag: e.target.value })}
            className="w-full p-2 rounded bg-navy-800 border border-navy-700 text-slate-200"
            placeholder="Panama"
            required
          />
        </div>
      </div>
    </SectionCard>
  );
};

export default IdentificationFormCard;