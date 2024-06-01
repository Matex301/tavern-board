"use client"
import React, { useState } from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const center = {
  lat: 50.049683,
  lng: 19.944544
};

function Map() {
  const [map, setMap] = useState<google.maps.Map|null>(null)
  const [markers, setMarker] = useState([]);

  function onLoad(map: google.maps.Map) {
    setMap(map);
  }

  function onUnmount() {
    setMap(null);
  }

  function onIdle() {
    console.log(map?.getBounds());
  }

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: ""
  })

  return isLoaded ? (
      <GoogleMap
        mapContainerClassName='h-2/3 md:h-full w-full'
        center={center}
        zoom={14}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onIdle={onIdle}
      >
        { /* Child components, such as markers, info windows, etc. */ <Marker onClick={() => {console.log('Marker Click')}} position={{lat: 50.049683, lng: 19.944544}} /> }
        <></>
      </GoogleMap>
  ) : <></>
}

export default React.memo(Map);