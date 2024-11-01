import React,{ useEffect, useState } from 'react'

import '../../styles/common/CheckMarker.scss';

interface CheckMarkerProps {
  value: any;
}

const CheckMarker: React.FC<CheckMarkerProps> = ({ value }) => {
  const [checkMarker, setCheckMarker ] = useState(false);
  useEffect(()=>{
    if(value === ''|| value === 0 || value === null ){
      setCheckMarker(false);
    }else{
      setCheckMarker(true);
    }
  },[value])

  return (
    <>
      {checkMarker && <div className='check'>checked!</div>}
    </>
  )
}

export default CheckMarker