// src/components/MapView.tsx
import React, { useMemo, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// --- Fallback iconos por si algo carga sin nuestros divIcons
import marker2x from 'leaflet/dist/images/marker-icon-2x.png';
import marker1x from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: marker2x,
  iconUrl: marker1x,
  shadowUrl: markerShadow,
});

// ===== Tipos =====
export type MarkerData = {
  id: string;
  name: string;
  lat: number;
  lon: number;
  sog?: number; // knots
  cog?: number; // degrees 0–359
};

type Props = {
  markers: MarkerData[];
  height?: number | string;
};

// ===== Icono SVG rotado según COG =====
const ARROW_SIZE = 24; // px
const CIRCLE_SIZE = 14; // px

function makeVesselIcon(m: MarkerData): L.DivIcon {
  const isStopped = m.sog == null || m.sog <= 0.2;
  const fill = isStopped ? '#9CA3AF' : '#F59E0B';
  const stroke = 'rgba(10,25,47,0.9)';

  const html = isStopped
    ? (() => {
        const d = CIRCLE_SIZE;
        return `
          <svg width="${d}" height="${d}" viewBox="0 0 ${d} ${d}" xmlns="http://www.w3.org/2000/svg">
            <circle cx="${d / 2}" cy="${d / 2}" r="${(d - 2) / 2}"
                    fill="${fill}" stroke="${stroke}" stroke-width="2" />
          </svg>
        `;
      })()
    : (() => {
        const s = ARROW_SIZE;
        const cog = (m.cog ?? 0) % 360;
        return `
          <svg width="${s}" height="${s}" viewBox="0 0 ${s} ${s}"
               xmlns="http://www.w3.org/2000/svg"
               style="transform: rotate(${cog}deg); transform-origin: 50% 50%;">
            <polygon points="${s / 2},3  ${s - 4},${s - 4}  4,${s - 4}"
                     fill="${fill}" stroke="${stroke}" stroke-width="2" />
          </svg>
        `;
      })();

  return L.divIcon({
    html,
    className: 'neptuno-vessel-icon',
    iconSize: isStopped ? [CIRCLE_SIZE, CIRCLE_SIZE] : [ARROW_SIZE, ARROW_SIZE],
    iconAnchor: isStopped ? [CIRCLE_SIZE / 2, CIRCLE_SIZE / 2] : [ARROW_SIZE / 2, ARROW_SIZE / 2],
    popupAnchor: [0, -ARROW_SIZE / 2],
  });
}

// ===== Ajustar a los marcadores con zoom mínimo efectivo =====
const WORLD_BOUNDS = L.latLngBounds([[-85, -180], [85, 180]]);
const MIN_FIT_ZOOM = 2.3;              // ⬅️ no dejaremos que el encuadre baje de aquí
const SINGLE_MARKER_ZOOM = 6;        // zoom cómodo si hay solo un punto
const PADDING: [number, number] = [48, 48];

const FitToMarkers: React.FC<{ markers: MarkerData[] }> = ({ markers }) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    if (markers.length === 0) {
      map.setView([0, 0], Math.max(MIN_FIT_ZOOM, 3));
      return;
    }

    if (markers.length === 1) {
      const m = markers[0];
      map.setView([m.lat, m.lon], SINGLE_MARKER_ZOOM);
      return;
    }

    const bounds = L.latLngBounds(markers.map(m => [m.lat, m.lon] as [number, number]));
    // Calculamos el zoom que encuadra y lo “clampeamos” al mínimo deseado
    const targetZoom = map.getBoundsZoom(bounds, false, L.point(PADDING));
    const clampedZoom = Math.max(targetZoom, MIN_FIT_ZOOM);
    const center = bounds.getCenter();
    map.setView(center, clampedZoom);
  }, [markers, map]);

  // 💡 Fuerza recálculo de tamaño (gris tras login / cambios de visibilidad)
  useEffect(() => {
    if (!map) return;
    const invalidate = () => map.invalidateSize();
    const t1 = setTimeout(invalidate, 80);
    const t2 = setTimeout(invalidate, 300);
    document.addEventListener('visibilitychange', invalidate);
    window.addEventListener('resize', invalidate);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      document.removeEventListener('visibilitychange', invalidate);
      window.removeEventListener('resize', invalidate);
    };
  }, [map]);

  return null;
};

const MapView: React.FC<Props> = ({ markers, height = 420 }) => {
  // Empezamos ya un poco más cerca
  const center = useMemo(() => ({ lat: 0, lon: 0, zoom: MIN_FIT_ZOOM }), []);
  const mapRef = useRef<L.Map | null>(null);

  return (
    <div style={{ height }}>
      <MapContainer
        whenCreated={(m) => {
          mapRef.current = m;
          setTimeout(() => m.invalidateSize(), 50);
          setTimeout(() => m.invalidateSize(), 250);
        }}
        center={[center.lat, center.lon]}
        zoom={center.zoom}
        minZoom={MIN_FIT_ZOOM}       // ⬅️ subimos el minZoom global
        maxBounds={WORLD_BOUNDS}
        maxBoundsViscosity={1.0}
        worldCopyJump={false}
        style={{ height: '100%', width: '100%', borderRadius: 12 }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          noWrap={true}              // no repetimos el mundo; evitamos “copias”
        />

        <FitToMarkers markers={markers} />

        {markers.map(m => (
          <Marker key={m.id} position={[m.lat, m.lon]} icon={makeVesselIcon(m)}>
            <Popup>
              <div>
                <strong>{m.name}</strong>
                {m.sog != null && <div>SOG: {m.sog} kn</div>}
                {m.cog != null && <div>COG: {m.cog}°</div>}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;