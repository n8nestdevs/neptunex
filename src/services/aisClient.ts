// src/services/aisClient.ts

// === Tipos que imitaremos de VesselFinder (simplificados) ===
export type VFDatasets = 'ais' | 'voyage' | 'master';

export type VFGetVesselsParams = {
  imo?: string[];    // lista de IMO como strings (sin "IMO" delante)
  mmsi?: string[];   // (no lo usamos aún)
  datasets?: VFDatasets[]; // ['ais','voyage','master']
};

// Respuesta simulada por buque (formato parecido al de VF)
export type VFVessel = {
  imo?: string; // sin el prefijo "IMO"
  mmsi?: string;
  name?: string;
  flag?: string;
  ais?: {
    lat: number;
    lon: number;
    sog?: number | null;
    cog?: number | null;
    ts?: string; // timestamp
  } | undefined;
  voyage?: {
    dep_port?: string;
    dep_time?: string;
    dest_port?: string;
    eta?: string;
  } | undefined;
  master?: Record<string, unknown> | null | undefined;
};

// === SDK mock: trae datos desde nuestro mock local y los "disfraza" como VF ===
export async function getVessels(params: VFGetVesselsParams = {}): Promise<VFVessel[]> {
  // Carga perezosa para evitar ciclos
  const { initialVessels } = await import('../data/mockData');

  // Si llegan IMOs, filtramos; recuerda que en nuestro mock el id es "IMO9334567"
  const filtered = params.imo && params.imo.length
    ? initialVessels.filter(v => params.imo!.includes(v.id.replace('IMO', '')))
    : initialVessels;

  const includeVoyage = !params.datasets || params.datasets.includes('voyage');
  const includeMaster = params.datasets?.includes('master');

  return filtered.map(v => ({
    imo: v.id.replace('IMO', ''),
    name: v.name,
    flag: v.flag,
    ais: v.position
      ? {
          lat: v.position.lat,
          lon: v.position.lon,
          sog: v.position.sog ?? null,
          cog: v.position.cog ?? null,
          ts: new Date().toISOString(),
        }
      : undefined,
    voyage: includeVoyage
      ? {
          dep_port: v.voyage.departurePort,
          dep_time: v.voyage.etd,
          dest_port: v.voyage.destinationPort,
          eta: v.voyage.eta,
        }
      : undefined,
    master: includeMaster ? {} : undefined,
  }));
}
