// src/components/vessel/VoyageCard.tsx
import React, { useMemo } from 'react';
import { Vessel } from '../../types';
import SectionCard, { Field } from './SectionCard';
import { IconCalendar } from '../Icons';
import { useNavigate } from 'react-router-dom';

function toDMS(dec: number, isLat: boolean): string {
  const hemi = dec === 0 ? '' : dec > 0 ? (isLat ? 'N' : 'E') : (isLat ? 'S' : 'W');
  const abs = Math.abs(dec);
  const deg = Math.floor(abs);
  const minFloat = (abs - deg) * 60;
  let min = Math.floor(minFloat);
  let sec = Math.round((minFloat - min) * 60 * 10) / 10; // 1 decimal in seconds

  if (sec === 60) { sec = 0; min += 1; }
  if (min === 60) { min = 0; }

  const d = `${deg}°`;
  const m = ` ${min}′`;
  const s = ` ${sec.toString().replace('.', ',')}″`;
  return `${d}${m}${s}${hemi ? ' ' + hemi : ''}`;
}

const VoyageCard: React.FC<{ vessel: Vessel }> = ({ vessel }) => {
  const navigate = useNavigate();

  const pos = vessel.position;
  const latDms = useMemo(() => (pos ? toDMS(pos.lat, true) : '—'), [pos]);
  const lonDms = useMemo(() => (pos ? toDMS(pos.lon, false) : '—'), [pos]);

  const handleViewOnMap = () => {
    if (!pos) return;
    navigate(`/?centerLat=${pos.lat}&centerLon=${pos.lon}&zoom=6`);
  };

  return (
    <SectionCard title="Voyage" icon={<IconCalendar className="w-6 h-6" />}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
        {/* Origin */}
        <div>
          <p className="text-sm font-bold text-slate-400 mb-2">Origin</p>
          <Field label="Departure Port" value={vessel.voyage.departurePort} />
          <Field
            label="ETD (Zulu)"
            value={
              new Date(vessel.voyage.etd).toLocaleString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                timeZone: 'UTC',
              }) + ' Z'
            }
          />
        </div>

        {/* Destination */}
        <div>
          <p className="text-sm font-bold text-slate-400 mb-2">Destination</p>
          <Field label="Arrival Port" value={vessel.voyage.destinationPort} />
          <Field
            label="ETA (Zulu)"
            value={
              new Date(vessel.voyage.eta).toLocaleString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                timeZone: 'UTC',
              }) + ' Z'
            }
          />
        </div>

        {/* Position */}
        <div>
          <p className="text-sm font-bold text-slate-400 mb-2">Position / Status</p>
          <Field label="Latitude" value={latDms} mono />
          <Field label="Longitude" value={lonDms} mono />
        </div>

        {/* COG / SOG + button */}
        <div className="md:pl-6">
          <p className="text-sm font-bold text-slate-400 mb-2">&nbsp;</p>
          <Field label="COG (°)" value={pos?.cog != null ? `${pos.cog}°` : '—'} />
          <Field label="SOG (kn)" value={pos?.sog != null ? `${pos.sog.toString().replace('.', ',')} kn` : '—'} />
          <button
            onClick={handleViewOnMap}
            disabled={!pos}
            className="mt-3 w-full md:w-auto bg-teal-500 text-navy-900 font-bold py-2 px-4 rounded-md hover:bg-teal-400 disabled:opacity-50"
          >
            View on map
          </button>
        </div>
      </div>
    </SectionCard>
  );
};

export default VoyageCard;