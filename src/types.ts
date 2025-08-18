export enum UserRole {
  Admin = 'Admin',
  ReadOnly = 'ReadOnly',
}

export interface Document {
  id: string;
  name: string;
  url: string;
  uploadedAt: string; // ISO string
}

export interface ChecklistItem {
  id: string;
  task: string;
  completed: boolean;
}

export interface Position {
  lat: number;
  lon: number;
  sog?: number; // speed over ground
  cog?: number; // course over ground
}

export interface Vessel {
  id: string; // IMO
  name: string;
  flag: string;
  imageUrl: string;
  contact: {
    email: string;
    phone: string;
  };
  voyage: {
    departurePort: string;
    etd: string;
    destinationPort: string;
    eta: string;
  };
  documents: Document[];
  complianceChecklist: ChecklistItem[];
  position?: Position;
}