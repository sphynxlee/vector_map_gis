import { useRef, useEffect } from 'react'
import mapboxgl from 'mapbox-gl'

import 'mapbox-gl/dist/mapbox-gl.css';

import './App.css'

function App() {

  const mapRef = useRef<mapboxgl.Map | null>(null)
  const mapContainerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1Ijoic3BoeW54bGVlIiwiYSI6ImNtMWdrbDllbDA1ZTEycW9vMWhsamQ2NWsifQ.wAOKSfMchVOba8dGvboaPg'
    if (mapContainerRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        center: [-74.0242, 40.6941],
        zoom: 10.12
      });
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    }
  }, [])

  return (
    <>
      <div id='map-container' ref={mapContainerRef}/>
    </>
  )
}

export default App