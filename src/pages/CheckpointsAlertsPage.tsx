import React from 'react';
import SectionCard from '../components/vessel/SectionCard';

const CheckpointsAlertsPage: React.FC = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-slate-100">Checkpoints Alerts</h1>

      {/* Placeholder inicial: luego agregamos contenedores reales */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <SectionCard title="Upcoming alerts">
          <div className="text-slate-400 text-sm">No upcoming alerts yet.</div>
        </SectionCard>

        <SectionCard title="Recent alerts">
          <div className="text-slate-400 text-sm">No recent alerts.</div>
        </SectionCard>

        <SectionCard title="Configuration">
          <div className="text-slate-400 text-sm">
            Soon you’ll be able to manage checkpoint rules and recipients here.
          </div>
        </SectionCard>
      </div>
    </div>
  );
};

export default CheckpointsAlertsPage;