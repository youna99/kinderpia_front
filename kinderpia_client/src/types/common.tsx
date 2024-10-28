declare global {
  interface Window {
    naver: any;
  }
}

export interface CommonButtonProps {
  text: string;
  onClick: () => Promise<void>;
  disabled?: boolean;
  isLoading?: boolean;
}

export interface SearchResult {
  title: string;
  address: string;
  roadAddress: string;
  mapx: string;
  mapy: string;
}

export interface LocationData {
  name: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface MapSelectorProps {
  onLocationSelect?: (location: LocationData) => void;
}
