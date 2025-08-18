// src/pages/NewVesselPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type {
  Vessel,
  ChecklistItem,
  Document,
  NotificationRule,
} from '../types';
import { initialVessels } from '../data/mockData';

import NewVesselForm, { FormState } from '../components/newVessel/NewVesselForm';
import NewVesselChecklistPanel from '../components/newVessel/NewVesselChecklistPanel';
import NewVesselDocumentsPanel from '../components/newVessel/NewVesselDocumentsPanel';
import NewVesselNotificationsPanel from '../components/newVessel/NewVesselNotificationsPanel';

const NewVesselPage: React.FC = () => {
  const navigate = useNavigate();

  // ===== Form state =====
  const [form, setForm] = useState<FormState>({
    id: '',
    name: '',
    flag: '',
    email: '',
    phone: '',
    departurePort: '',
    etd: '',
    destinationPort: '',
    eta: '',
    lat: '',
    lon: '',
    sog: '',
    cog: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // ===== Right column panels state =====
  const [checklist, setChecklist] = useState<ChecklistItem[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [notifications, setNotifications] = useState<NotificationRule[]>([]);

  // ===== Validation =====
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

  // ===== Submit =====
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
      // 👇 guardamos lo que venga de los paneles derechos
      documents,
      complianceChecklist: checklist,
      notifications,
      position:
        latNum != null && lonNum != null
          ? { lat: latNum, lon: lonNum, sog: sogNum, cog: cogNum }
          : undefined,
    };

    initialVessels.push(newVessel);
    navigate('/tracking');
  };

  return (
    <div className="space-y-4">
      {/* Page title */}
      <h1 className="text-2xl font-bold text-slate-100">Add New Vessel</h1>

      {/* Main grid: left form + right stacked panels */}
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] items-start">
        {/* Left card (Form) */}
        <div className="bg-navy-800/60 border border-navy-700 rounded-xl p-4">
          {error && (
            <div className="mb-4 p-3 rounded bg-red-900/40 border border-red-700 text-red-200">
              {error}
            </div>
          )}
          <NewVesselForm
            form={form}
            setForm={setForm}
            saving={saving}
            onSubmit={handleSubmit}
          />
        </div>

        {/* Right column: sticky stack of panels */}
        <div className="lg:sticky lg:top-[72px] space-y-4">
          <NewVesselChecklistPanel
            value={checklist}
            onChange={setChecklist}
          />
          <NewVesselDocumentsPanel
            value={documents}
            onChange={setDocuments}
          />
          <NewVesselNotificationsPanel
            value={notifications}
            onChange={setNotifications}
          />
        </div>
      </div>
    </div>
  );
};

export default NewVesselPage;