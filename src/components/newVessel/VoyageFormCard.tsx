import React from "react";
import SectionCard from "../vessel/SectionCard";
import { Calendar } from "lucide-react";

export type VoyageFormState = {
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
  value: VoyageFormState;
  onChange: (patch: Partial<VoyageFormState>) => void;
};

const VoyageFormCard: React.FC<Props> = ({ value, onChange }) => {
  return (
    <SectionCard title="Voyage" icon={Calendar}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-slate-300 text-sm mb-1">Departure Port</label>
          <input
            name="departurePort"
            value={value.departurePort}
            onChange={(e) => onChange({ departurePort: e.target.value })}
            className="w-full p-2 rounded bg-navy-800 border border-navy-700 text-slate-200"
            placeholder="Valparaíso"
          />
        </div>
        <div>
          <label className="block text-slate-300 text-sm mb-1">ETD</label>
          <input
            type="datetime-local"
            name="etd"
            value={value.etd}
            onChange={(e) => onChange({ etd: e.target.value })}
            className="w-full p-2 rounded bg-navy-800 border border-navy-700 text-slate-200"
            required
          />
        </div>
        <div>
          <label className="block text-slate-300 text-sm mb-1">Destination Port</label>
          <input
            name="destinationPort"
            value={value.destinationPort}
            onChange={(e) => onChange({ destinationPort: e.target.value })}
            className="w-full p-2 rounded bg-navy-800 border border-navy-700 text-slate-200"
            placeholder="San Antonio"
          />
        </div>
        <div>
          <label className="block text-slate-300 text-sm mb-1">ETA</label>
          <input
            type="datetime-local"
            name="eta"
            value={value.eta}
            onChange={(e) => onChange({ eta: e.target.value })}
            className="w-full p-2 rounded bg-navy-800 border border-navy-700 text-slate-200"
            required
          />
        </div>
      </div>

      {/* Initial Position (optional) */}
      <div className="mt-4 bg-navy-800/50 border border-navy-700 rounded-lg p-4 space-y-3">
        <div className="text-slate-300 font-medium">Initial Position (optional)</div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-slate-300 text-sm mb-1">Lat (-90 to 90)</label>
            <input
              name="lat"
              value={value.lat}
              onChange={(e) => onChange({ lat: e.target.value })}
              className="w-full p-2 rounded bg-navy-800 border border-navy-700 text-slate-200"
              placeholder="-33.45"
            />
          </div>
          <div>
            <label className="block text-slate-300 text-sm mb-1">Lon (-180 to 180)</label>
            <input
              name="lon"
              value={value.lon}
              onChange={(e) => onChange({ lon: e.target.value })}
              className="w-full p-2 rounded bg-navy-800 border border-navy-700 text-slate-200"
              placeholder="-70.67"
            />
          </div>
          <div>
            <label className="block text-slate-300 text-sm mb-1">SOG (kn)</label>
            <input
              name="sog"
              value={value.sog}
              onChange={(e) => onChange({ sog: e.target.value })}
              className="w-full p-2 rounded bg-navy-800 border border-navy-700 text-slate-200"
              placeholder="12.3"
            />
          </div>
          <div>
            <label className="block text-slate-300 text-sm mb-1">COG (°)</label>
            <input
              name="cog"
              value={value.cog}
              onChange={(e) => onChange({ cog: e.target.value })}
              className="w-full p-2 rounded bg-navy-800 border border-navy-700 text-slate-200"
              placeholder="280"
            />
          </div>
        </div>
        <div className="text-slate-500 text-xs">
          If no lat/lon is entered, the vessel will be created without a position and will not appear on the map until AIS data is received.
        </div>
      </div>
    </SectionCard>
  );
};

export default VoyageFormCard;