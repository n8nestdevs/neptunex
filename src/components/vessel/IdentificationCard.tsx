// src/components/vessel/IdentificationCard.tsx
import React from 'react';
import { Vessel } from '../../types';
import SectionCard, { Field } from './SectionCard';
import { IconShip } from '../Icons';

const IdentificationCard: React.FC<{ vessel: Vessel }> = ({ vessel }) => {
  return (
    <SectionCard title="Identification" icon={<IconShip className="w-6 h-6" />}>
      <div className="space-y-2">
        <Field label="Vessel Name" value={vessel.name} />
        <Field label="Flag" value={vessel.flag} />
        <Field label="International Call Sign" value={vessel.id} mono />
      </div>
    </SectionCard>
  );
};

export default IdentificationCard;