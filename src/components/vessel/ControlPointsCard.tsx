// src/components/vessel/ControlPointsCard.tsx
import React from 'react';
import { Vessel } from '../../types';
import SectionCard from './SectionCard';
import { IconClock } from '../Icons';

function zulu(dt: string) {
  return new Date(dt).toLocaleString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit', timeZone: 'UTC'
  }) + ' Z';
}

const ControlPointsCard: React.FC<{ vessel: Vessel }> = ({ vessel }) => {
  const eta = new Date(vessel.voyage.eta);
  const offsetsHrs = [96, 72, 48, 24];
  const checkpoints = offsetsHrs.map(h => {
    const when = new Date(eta.getTime() - h * 3600 * 1000);
    return { label: `Notify ${h} hours before ETA`, date: zulu(when.toISOString()) };
  });

  return (
    <SectionCard title="Checkpoint" icon={<IconClock className="w-6 h-6" />}>
      <div className="space-y-2">
        {checkpoints.map(cp => (
          <div key={cp.label} className="flex items-center justify-between p-3 bg-navy-700/50 rounded-md">
            <p className="text-slate-300">{cp.label}</p>
            <p className="font-mono text-teal-400">{cp.date}</p>
          </div>
        ))}
      </div>
    </SectionCard>
  );
};

export default ControlPointsCard;