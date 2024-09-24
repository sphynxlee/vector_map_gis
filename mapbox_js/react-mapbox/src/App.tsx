import { useRef, useEffect, useState } from 'react'
import mapboxgl, { LngLatLike } from 'mapbox-gl'

import 'mapbox-gl/dist/mapbox-gl.css';

import constants from './map-config/constants.json';
import './App.css'

const INITIAL_CENTER: LngLatLike = [116.4, 39.9];
const INITIAL_ZOOM: number = 10.12;

function App() {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  const [center, setCenter] = useState<LngLatLike>(INITIAL_CENTER);
  const [zoom, setZoom] = useState<number>(INITIAL_ZOOM);

  useEffect(() => {
    if (mapContainerRef.current) {
      mapboxgl.accessToken = constants.accessToken.mapbox;

      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        center: center,
        zoom: zoom
      });

      mapRef.current.addControl(new mapboxgl.NavigationControl());

      mapRef.current.on('move', () => {
        const mapCenter = mapRef.current?.getCenter();
        const mapZoom = mapRef.current?.getZoom();

        setCenter([mapCenter?.lng as number, mapCenter?.lat as number]);
        setZoom(mapZoom as number);
      });


      return () => {
        if (mapRef.current) {
          mapRef.current.remove();
        }
      }
    }
  }, []);

  const handleResetButtonClick = () => {
    mapRef.current?.flyTo({
      center: INITIAL_CENTER,
      zoom: INITIAL_ZOOM
    });
  };

  return (
    <>
      <div className="sidebar">
        Longitude: {(center as number[])[0].toFixed(4)}, Latitude: {(center as number[])[1].toFixed(4)}, Zoom: {zoom.toFixed(2)}
      </div>
      <button className='reset-button' onClick={handleResetButtonClick} >Reset</button>
      <div id='map-container' ref={mapContainerRef} />
    </>
  )
}

export default App