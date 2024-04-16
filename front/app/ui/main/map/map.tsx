"use client"
import React from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const center = {
  lat: 50.049683,
  lng: 19.944544
};

function Map() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: ""
  })

  return isLoaded ? (
      <GoogleMap
        mapContainerClassName='h-2/3 md:h-full w-full'
        center={center}
        zoom={14}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
  ) : <></>
}

export default React.memo(Map);