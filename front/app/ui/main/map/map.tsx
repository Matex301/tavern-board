"use client"

import React, { Dispatch, useState } from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { TavernSelect } from '@/app/types/TavernSelect';
import { Address } from '@/app/types/Tavern';
import { Tavern } from '@/app/types/Tavern';
import { useDebouncedCallback } from 'use-debounce';
import { fetchTavernsListMap } from '@/app/api-actions/taverns';
import Spinner from '../spinner';

const center = {
  lat: 50.049683,
  lng: 19.944544
};

function Map({setTavernSelect}: {setTavernSelect: Dispatch<TavernSelect>}) {
  const [map, setMap] = useState<google.maps.Map|null>(null)
  const [loading, setLoading] = useState<boolean>(false);
  const [markers, setMarkers] = useState<TavernSelect[]>([]);

  function onLoad(map: google.maps.Map) {
    setMap(map);
  }

  function onUnmount() {
    setMap(null);
  }

  const controller = new AbortController();
  const signal = controller.signal;

  const onIdle = useDebouncedCallback(
    () => {
      if(!map)
        return;

      const bounds = map.getBounds();
      if(!bounds)
        return;

      const northEast = bounds.getNorthEast();
      const southWest = bounds.getSouthWest();
      setLoading(true);
      fetchTavernsListMap(signal, northEast.lat(), northEast.lng(), southWest.lat(), southWest.lng()).then(response => {
        if(!response)
          return;

        if(!response['hydra:member'])
          return;

        let markers: TavernSelect[] = [];
        response['hydra:member'].forEach((tavernSelect) => {
          markers.push(tavernSelect);
        })

        setMarkers(markers);
        setLoading(false);
      });
    },
    1700
  )

  function onClick(tavern: TavernSelect) {
    console.log('Marker onClick');
    setTavernSelect(tavern);
  }

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: ''
  })

  return isLoaded ? (
      <GoogleMap
        mapContainerClassName='grow md:h-full w-full'
        center={center}
        zoom={14}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onIdle={onIdle}
      >
        {loading &&
          <div className='absolute left-[50%] top-[15%] w-fit'>
            <Spinner />
          </div>
        }


        {markers.map((marker: TavernSelect) => (
          <Marker
            key={marker.id}
            position={{lat: marker.address.latitude, lng: marker.address.longitude}}
            onClick={() => {onClick(marker)}}
          />
        ))}
      </GoogleMap>
  ) : <></>
}

export default React.memo(Map);