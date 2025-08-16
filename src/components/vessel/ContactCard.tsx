// src/components/vessel/ContactCard.tsx
import React from 'react';
import { Vessel } from '../../types';
import SectionCard, { Field } from './SectionCard';
import { IconPhone } from '../Icons';

const ContactCard: React.FC<{ vessel: Vessel }> = ({ vessel }) => {
  return (
    <SectionCard title="Contact Information" icon={<IconPhone className="w-6 h-6" />}>
      <div className="space-y-4">
        <Field label="Email" value={vessel.contact.email} />
        <Field label="Phone" value={vessel.contact.phone} />
      </div>
    </SectionCard>
  );
};

export default ContactCard;