import React, { useEffect, useRef } from 'react';
import { MapProps } from '../../types/map';

import '../../styles/meeting/createpage/DynamicMapView.scss'

const DynamicMapView: React.FC<MapProps> = ({ center, marker }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<naver.maps.Map | null>(null);
  const markerInstance = useRef<naver.maps.Marker | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const mapOptions = {
      center: new naver.maps.LatLng(
        center?.lat || 37.5666805,
        center?.lng || 126.9784147
      ),
      zoom: 15,
      zoomControl: true,
      zoomControlOptions: {
        position: naver.maps.Position.TOP_RIGHT,
      },
    };
    mapInstance.current = new naver.maps.Map(mapRef.current, mapOptions);

    setTimeout(() => {
      if (mapInstance.current) {
        naver.maps.Event.trigger(mapInstance.current, 'resize');
      }
    }, 100);

    return () => {
      mapInstance.current = null;
    };
  }, [center?.lat, center?.lng]);

  useEffect(() => {
    if (!mapInstance.current || !marker) return;

    if (markerInstance.current) {
      markerInstance.current.setMap(null);
    }

    const position = new naver.maps.LatLng(marker.lat, marker.lng);
    
    markerInstance.current = new naver.maps.Marker({
      position,
      map: mapInstance.current
    });

    mapInstance.current.setCenter(position);
    
    setTimeout(() => {
      if (mapInstance.current) {
        naver.maps.Event.trigger(mapInstance.current, 'resize');
      }
    }, 100);
  }, [marker]);

  useEffect(() => {
    const handleResize = () => {
      if (mapInstance.current) {
        naver.maps.Event.trigger(mapInstance.current, 'resize');
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <div className="map-container" ref={mapRef} />;
};

export default DynamicMapView;