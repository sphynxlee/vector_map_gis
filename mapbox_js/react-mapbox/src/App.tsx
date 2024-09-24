import { useRef, useEffect } from 'react'
import mapboxgl from 'mapbox-gl'

import 'mapbox-gl/dist/mapbox-gl.css';

import './App.css'

function App() {

  const mapRef = useRef()
  const mapContainerRef = useRef()

  useEffect(() => {
    mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN'
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: [-74.0242, 40.6941],
      zoom: 10.12
    });

    return () => {
      mapRef.current.remove()
    }
  }, [])

  return (
    <>
      <div id='map-container' ref={mapContainerRef}/>
    </>
  )
}

export default App