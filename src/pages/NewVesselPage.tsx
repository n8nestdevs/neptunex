// src/pages/NewVesselPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Vessel, ChecklistItem, Document, NotificationRule } from '../types';
import { initialVessels } from '../data/mockData';

import IdentificationFormCard, { IdentificationFormState } from '../components/newVessel/IdentificationFormCard';
import ContactFormCard, { ContactFormState } from '../components/newVessel/ContactFormCard';
import VoyageFormCard, { VoyageFormState } from '../components/newVessel/VoyageFormCard';

import NewVesselChecklistPanel from '../components/newVessel/NewVesselChecklistPanel';
import NewVesselDocumentsPanel from '../components/newVessel/NewVesselDocumentsPanel';
import NewVesselNotificationsPanel from '../components/newVessel/NewVesselNotificationsPanel';

export type FormState = IdentificationFormState & ContactFormState & VoyageFormState;

const NewVesselPage: React.FC = () => {
  const navigate = useNavigate();

  // ---- form principal
  const [form, setForm] = useState<FormState>({
    id: '', name: '', flag: '',
    email: '', phone: '',
    departurePort: '', etd: '',
    destinationPort: '', eta: '',
    lat: '', lon: '', sog: '', cog: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // ---- paneles derecha
  const [checklist, setChecklist] = useState<ChecklistItem[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [notifications, setNotifications] = useState<NotificationRule[]>([]);

  const setFormPartial = (patch: Partial<FormState>) =>
    setForm(prev => ({ ...prev, ...patch }));

  const validate = () => {
    if (!form.id || !form.name || !form.flag) return 'Required fields missing (IMO, Name, Flag).';
    if (!form.etd || !form.eta) return 'You must enter ETD and ETA.';
    if (form.lat && isNaN(Number(form.lat))) return 'Latitude must be numeric.';
    if (form.lon && isNaN(Number(form.lon))) return 'Longitude must be numeric.';
    if (form.lat) {
      const v = Number(form.lat);
      if (v < -90 || v > 90) return 'Latitude out of range (-90 to 90).';
    }
    if (form.lon) {
      const v = Number(form.lon);
      if (v < -180 || v > 180) return 'Longitude out of range (-180 to 180).';
    }
    if (form.sog && isNaN(Number(form.sog))) return 'SOG must be numeric.';
    if (form.cog && isNaN(Number(form.cog))) return 'COG must be numeric.';
    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const err = validate();
    if (err) { setError(err); return; }
    setSaving(true);

    const latNum = form.lat ? Number(form.lat) : undefined;
    const lonNum = form.lon ? Number(form.lon) : undefined;
    const sogNum = form.sog ? Number(form.sog) : undefined;
    const cogNum = form.cog ? Number(form.cog) : undefined;

    const newVessel: Vessel = {
      id: form.id,
      name: form.name,
      flag: form.flag,
      imageUrl: 'https://picsum.photos/seed/' + encodeURIComponent(form.id) + '/800/600',
      contact: { email: form.email, phone: form.phone },
      voyage: {
        departurePort: form.departurePort,
        etd: form.etd,
        destinationPort: form.destinationPort,
        eta: form.eta,
      },
      documents, // <- desde panel
      complianceChecklist: checklist, // <- desde panel
      position: latNum != null && lonNum != null ? { lat: latNum, lon: lonNum, sog: sogNum, cog: cogNum } : undefined,
      // notifications no iban en Vessel; si quieres guardarlas, podemos extender el tipo.
    };

    initialVessels.push(newVessel);
    navigate('/tracking');
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-slate-100">Add New Vessel</h1>

      {error && (
        <div className="p-3 rounded bg-red-900/40 border border-red-700 text-red-200">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <IdentificationFormCard value={form} onChange={setFormPartial} />
            <ContactFormCard value={form} onChange={setFormPartial} />
          </div>
          <VoyageFormCard value={form} onChange={setFormPartial} />

          <div className="flex justify-start pt-1">
            <button
              type="submit"
              disabled={saving}
              className="bg-teal-500 hover:bg-teal-400 text-navy-900 font-semibold px-4 py-2 rounded-md border border-teal-400 disabled:opacity-60"
            >
              {saving ? 'Saving…' : 'Save'}
            </button>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-4">
          <NewVesselDocumentsPanel value={documents} onChange={setDocuments} />
          <NewVesselChecklistPanel value={checklist} onChange={setChecklist} />
          <NewVesselNotificationsPanel value={notifications} onChange={setNotifications} />
        </div>
      </form>
    </div>
  );
};

export default NewVesselPage;