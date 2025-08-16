// src/utils/format.ts
export const formatZuluDate = (dateString: string) =>
  new Date(dateString).toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC',
    hour12: false,
  }) + ' Z';

// Decimal → DMS con hemisferio y formato: 12° 24' 12,1''S
export const toDmsPretty = (decimal: number, isLat: boolean): string => {
  const hem = isLat ? (decimal < 0 ? 'S' : 'N') : (decimal < 0 ? 'W' : 'E');
  const abs = Math.abs(decimal);

  const deg = Math.floor(abs);
  const minFloat = (abs - deg) * 60;
  const min = Math.floor(minFloat);
  let secFloat = (minFloat - min) * 60;

  let sec = Math.round(secFloat * 10) / 10; // 1 decimal

  // corrección por 60,0''
  let D = deg, M = min;
  if (sec >= 60) {
    sec = 0;
    M += 1;
    if (M >= 60) { M = 0; D += 1; }
  }

  const pad2 = (n: number) => n.toString().padStart(2, '0');
  const secStr = sec.toFixed(1).replace('.', ','); // coma decimal

  return `${D}° ${pad2(M)}' ${secStr}''${hem}`;
};

export const calcCheckpoints = (eta: string) => {
  const etaDate = new Date(eta);
  const toZuluString = (d: Date) =>
    d.toLocaleString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'UTC',
      hour12: false,
    }) + ' Z';

  return [96, 72, 48, 24].map((h) => {
    const t = new Date(etaDate.getTime() - h * 60 * 60 * 1000);
    return { label: `Notificación ${h} horas antes del ETA`, date: toZuluString(t) };
  });
};