import React, { useEffect, useState } from 'react'
import { PlaceListInfo } from '../types/types';
import { getPlaces } from '../api/test';

const Meetings = () => {
  const [placeList, setPlaceList] = useState<PlaceListInfo[]>([]);

  const getPlaceList = async () => {
    try {
      const data = await getPlaces({
        // sort: 'star',
        page: 0,
        size: 8,
      });
      console.log(`place data>>>>`, data.data.content);

      setPlaceList(data.data.content);
    } catch (error) {
      console.log('장소목록 가져오는 중 에러 발생!: ', error);
    }
  };

  useEffect(() => {
    getPlaceList();
  }, []);
  
  return (
    <div>Meetings</div>
  )
}

export default Meetings