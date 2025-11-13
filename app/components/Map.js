'use client';
import { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

export default function Map({ points = [] }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const map = new maplibregl.Map({
      container: ref.current,
      style: 'https://demotiles.maplibre.org/style.json',
      center: [13.405, 52.52], // Берлин
      zoom: 9,
      attributionControl: true,
    });

    map.on('load', () => {
      points.forEach((p) => {
        const el = document.createElement('div');
        el.style.width = '14px';
        el.style.height = '14px';
        el.style.borderRadius = '50%';
        el.style.background = '#0f766e';
        el.style.border = '2px solid white';
        el.style.boxShadow = '0 0 0 2px rgba(15,118,110,.3)';

        new maplibregl.Marker(el)
          .setLngLat([p.lng, p.lat])
          .setPopup(
            new maplibregl.Popup().setHTML(
              `<b>${p.name}</b><br/>€${p.rate}/h`
            )
          )
          .addTo(map);
      });
    });

    return () => map.remove();
  }, [points]);

  return <div ref={ref} className="map" />;
}
