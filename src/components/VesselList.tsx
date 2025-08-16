
import React from 'react';
import { Link } from 'react-router-dom';
import { Vessel } from '../types';
import { IconAnchor, IconMapPin, IconClock } from './Icons';

interface VesselListProps {
  vessels: Vessel[];
}

const VesselListItem: React.FC<{ vessel: Vessel }> = ({ vessel }) => {
  const etaDate = new Date(vessel.voyage.eta);
  const formattedEta = etaDate.toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC'
  }) + ' Z';

  return (
    <Link to={`/vessel/${vessel.id}`} className="block group">
      <div className="bg-navy-800 rounded-lg shadow-lg p-6 hover:bg-navy-700 hover:shadow-teal-500/10 transition-all duration-300 h-full flex flex-col justify-between border border-navy-700">
        <div>
          <h3 className="text-xl font-bold text-slate-200 group-hover:text-teal-400 transition-colors">{vessel.name}</h3>
          <p className="text-sm text-slate-400 mb-4">IMO: {vessel.id}</p>
        </div>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <IconAnchor className="w-5 h-5 text-slate-400" />
            <span className="text-sm text-slate-300"><span className="font-semibold">Zarpe:</span> {vessel.voyage.departurePort}</span>
          </div>
          <div className="flex items-center space-x-2">
            <IconMapPin className="w-5 h-5 text-slate-400" />
            <span className="text-sm text-slate-300"><span className="font-semibold">Destino:</span> {vessel.voyage.destinationPort}</span>
          </div>
          <div className="flex items-center space-x-2">
            <IconClock className="w-5 h-5 text-slate-400" />
            <span className="text-sm text-slate-300"><span className="font-semibold">ETA:</span> {formattedEta}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

const VesselList: React.FC<VesselListProps> = ({ vessels }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {vessels.map(vessel => (
        <VesselListItem key={vessel.id} vessel={vessel} />
      ))}
    </div>
  );
};

export default VesselList;
