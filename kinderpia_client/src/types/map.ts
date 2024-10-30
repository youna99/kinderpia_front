// src/types/location.ts
export interface SearchResultItem {
  id: number;
  name: string;
  address: string;
  roadAddress: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface LocationData {
  name: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface MapProps {
  center?: {
    lat: number;
    lng: number;
  };
  marker?: {
    lat: number;
    lng: number;
  };
}