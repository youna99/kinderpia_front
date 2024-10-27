import React from 'react';
import PlaceList from '../components/common/PlaceList';

function PlaceLists() {
  return (
    <PlaceList
      title="도서관"
      category="교육 & 문화"
      rating={4.2}
      priceType="무료"
    />
  );
}

export default PlaceLists;
