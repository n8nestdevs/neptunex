// src/data/mockData.ts
import { Vessel } from '../types';

export const initialVessels: Vessel[] = [
  {
    id: 'IMO9334567',
    name: 'Andromeda Voyager',
    flag: 'Panama',
    imageUrl: 'https://picsum.photos/seed/IMO9334567/800/600',
    position: { lat: 29.75, lon: -94.97, sog: 14.2, cog: 85 }, // Cerca de Houston
    contact: { email: 'master@andromeda.com', phone: '+1-202-555-0171' },
    voyage: {
      departurePort: 'Port of Houston, USA',
      etd: '2024-07-15T10:00:00Z',
      destinationPort: 'Port of Rotterdam, Netherlands',
      eta: '2024-07-30T14:00:00Z',
    },
    documents: [
      { id: 'doc1', name: "Ship's tanks volumetric composite samples - 2024-07-14", url: '#', uploadedAt: '2024-07-14T09:00:00Z' },
      { id: 'doc2', name: 'Bill of Lading - HOU-ROT-001', url: '#', uploadedAt: '2024-07-15T11:00:00Z' },
    ],
    complianceChecklist: [
      { id: 'c1', task: 'Pre-departure safety inspection', completed: true },
      { id: 'c2', task: 'Customs clearance documents submitted', completed: true },
      { id: 'c3', task: 'Cargo plan approved', completed: false },
    ],
  },
  {
    id: 'IMO9456789',
    name: 'Orion Spirit',
    flag: 'Liberia',
    imageUrl: 'https://picsum.photos/seed/IMO9456789/800/600',
    position: { lat: 26.56, lon: 50.02, sog: 12.5, cog: 95 }, // Ras Tanura
    contact: { email: 'captain@orionspirit.net', phone: '+1-202-555-0182' },
    voyage: {
      departurePort: 'Ras Tanura, Saudi Arabia',
      etd: '2024-07-20T08:00:00Z',
      destinationPort: 'Port of Singapore, Singapore',
      eta: '2024-08-05T22:00:00Z',
    },
    documents: [],
    complianceChecklist: [
      { id: 'c1', task: 'Vetting inspection passed', completed: true },
      { id: 'c2', task: 'Bunker survey completed', completed: false },
    ],
  },
  {
    id: 'IMO9123456',
    name: 'Pegasus Prime',
    flag: 'Marshall Islands',
    imageUrl: 'https://picsum.photos/seed/IMO9123456/800/600',
    position: { lat: -23.96, lon: -46.33, sog: 10.1, cog: 70 }, // Santos
    contact: { email: 'ops@pegasus.com', phone: '+1-202-555-0193' },
    voyage: {
      departurePort: 'Port of Santos, Brazil',
      etd: '2024-07-25T18:00:00Z',
      destinationPort: 'Port of Qingdao, China',
      eta: '2024-08-28T06:00:00Z',
    },
    documents: [
      { id: 'doc1', name: 'Cargo Manifest - SAN-QIN-002', url: '#', uploadedAt: '2024-07-25T17:00:00Z' },
    ],
    complianceChecklist: [
      { id: 'c1', task: 'Initial draft survey complete', completed: true },
      { id: 'c2', task: 'Stowage plan confirmed', completed: true },
    ],
  },
  {
    id: 'IMO9876543',
    name: 'Hydra Carrier',
    flag: 'Malta',
    imageUrl: 'https://picsum.photos/seed/IMO9876543/800/600',
    position: { lat: 60.44, lon: 28.73, sog: 9.4, cog: 40 }, // Primorsk
    contact: { email: 'agent@hydra.mt', phone: '+356-2122-5555' },
    voyage: {
      departurePort: 'Port of Primorsk, Russia',
      etd: '2024-08-01T04:00:00Z',
      destinationPort: 'Port of Wilhelmshaven, Germany',
      eta: '2024-08-06T12:00:00Z',
    },
    documents: [],
    complianceChecklist: [
      { id: 'c1', task: 'Ice navigation plan approved', completed: false },
      { id: 'c2', task: 'Pilot booked for arrival', completed: false },
    ],
  },
  {
    id: 'IMO9654321',
    name: 'Centaurus Trader',
    flag: 'Singapore',
    imageUrl: 'https://picsum.photos/seed/IMO9654321/800/600',
    position: { lat: 3.00, lon: 101.40, sog: 14.8, cog: 110 }, // Port Klang
    contact: { email: 'ct-master@ship.sg', phone: '+65-6325-2489' },
    voyage: {
      departurePort: 'Port Klang, Malaysia',
      etd: '2024-08-03T11:00:00Z',
      destinationPort: 'Port of Melbourne, Australia',
      eta: '2024-08-15T16:00:00Z',
    },
    documents: [
      { id: 'doc1', name: 'Certificate of Origin', url: '#', uploadedAt: '2024-08-03T09:00:00Z' },
      { id: 'doc2', name: 'Health and Safety Report', url: '#', uploadedAt: '2024-08-03T10:00:00Z' },
    ],
    complianceChecklist: [
      { id: 'c1', task: 'Quarantine pre-clearance submitted', completed: true },
      { id: 'c2', task: 'Tugboats confirmed for arrival', completed: false },
    ],
  },
  {
    id: 'IMO9555666',
    name: 'Leo Majestic',
    flag: 'Greece',
    imageUrl: 'https://picsum.photos/seed/IMO9555666/800/600',
    position: { lat: 37.94, lon: 23.64, sog: 13.2, cog: 270 }, // Piraeus
    contact: { email: 'leo.majestic@fleet.gr', phone: '+30-210-452-9100' },
    voyage: {
      departurePort: 'Port of Piraeus, Greece',
      etd: '2024-08-10T14:00:00Z',
      destinationPort: 'Port of New York, USA',
      eta: '2024-08-25T09:00:00Z',
    },
    documents: [],
    complianceChecklist: [
      { id: 'c1', task: 'Suez Canal transit booked', completed: true },
      { id: 'c2', task: 'USCG pre-arrival notification sent', completed: false },
    ],
  },
  {
    id: 'IMO9777888',
    name: 'Draco Wave',
    flag: 'Hong Kong',
    imageUrl: 'https://picsum.photos/seed/IMO9777888/800/600',
    position: { lat: 31.23, lon: 121.47, sog: 15.0, cog: 120 }, // Shanghai
    contact: { email: 'draco.ops@shipping.hk', phone: '+852-2588-8888' },
    voyage: {
      departurePort: 'Port of Shanghai, China',
      etd: '2024-08-12T07:00:00Z',
      destinationPort: 'Port of Los Angeles, USA',
      eta: '2024-08-26T23:00:00Z',
    },
    documents: [
      { id: 'doc1', name: 'Container loading plan', url: '#', uploadedAt: '2024-08-12T06:00:00Z' },
    ],
    complianceChecklist: [
      { id: 'c1', task: 'Typhoon season route plan', completed: true },
      { id: 'c2', task: 'Final cargo count verified', completed: true },
    ],
  },
  {
    id: 'IMO9888999',
    name: 'Phoenix Dawn',
    flag: 'Cyprus',
    imageUrl: 'https://picsum.photos/seed/IMO9888999/800/600',
    position: { lat: 34.67, lon: 33.04, sog: 11.6, cog: 150 }, // Limassol
    contact: { email: 'phoenix@maritime.cy', phone: '+357-25-848-100' },
    voyage: {
      departurePort: 'Port of Limassol, Cyprus',
      etd: '2024-08-15T20:00:00Z',
      destinationPort: 'Port of Mumbai, India',
      eta: '2024-08-30T15:00:00Z',
    },
    documents: [],
    complianceChecklist: [
      { id: 'c1', task: 'Security patrol schedule for HRA', completed: false },
      { id: 'c2', task: 'Monsoon readiness check', completed: true },
    ],
  },
  {
    id: 'IMO9999000',
    name: 'Ursa Major',
    flag: 'Norway',
    imageUrl: 'https://picsum.photos/seed/IMO9999000/800/600',
    position: { lat: 60.38, lon: 5.05, sog: 10.7, cog: 200 }, // Sture
    contact: { email: 'ursa.major@ship.no', phone: '+47-22-33-44-55' },
    voyage: {
      departurePort: 'Sture, Norway',
      etd: '2024-08-18T09:00:00Z',
      destinationPort: 'Fawley, UK',
      eta: '2024-08-21T05:00:00Z',
    },
    documents: [
       { id: 'doc1', name: 'North Sea passage plan', url: '#', uploadedAt: '2024-08-18T08:00:00Z' },
    ],
    complianceChecklist: [
      { id: 'c1', task: 'ETA confirmed with Fawley terminal', completed: true },
      { id: 'c2', task: 'Weather routing service subscribed', completed: true },
    ],
  },
  {
    id: 'IMO9112233',
    name: 'Aquila Explorer',
    flag: 'Bahamas',
    imageUrl: 'https://picsum.photos/seed/IMO9112233/800/600',
    position: { lat: 27.80, lon: -97.39, sog: 12.0, cog: 75 }, // Corpus Christi
    contact: { email: 'aquila.exp@maritime.bs', phone: '+1-242-322-1234' },
    voyage: {
      departurePort: 'Corpus Christi, USA',
      etd: '2024-08-20T16:00:00Z',
      destinationPort: 'Port of Amsterdam, Netherlands',
      eta: '2024-09-05T18:00:00Z',
    },
    documents: [],
    complianceChecklist: [
      { id: 'c1', task: 'Trans-Atlantic route plan verified', completed: false },
      { id: 'c2', task: 'Bunker analysis report received', completed: false },
    ],
  },
];